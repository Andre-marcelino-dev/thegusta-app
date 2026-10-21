import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Pressable,
    Text,
    TextInput,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import sacolaStyle from "@/styles/sacolaStyle";
import Footer from "@/components/footer";
import { voltar } from "@/utils/navegacao";
import { useConfiguracoes } from "@/utils/loja";

import { cores } from "@/styles/variaveis";
import {
    alterarQuantidadeSacola,
    buscarSacola,
    ItemSacola,
    removerDaSacola,
} from "@/utils/sacola";
import { buscarEnderecoEntrega, EnderecoEntrega } from "@/utils/enderecos";
import { buscarEntregaCliente, EntregaCliente } from "@/utils/entrega";
import { calcularDesconto, Cupom, validarCupom } from "@/utils/cupons";


function formatarPreco(valor: number) {
    return `R$${valor.toFixed(2).replace(".", ",")}`;
}

function formatarPrecoResumo(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function SacolaScreen() {
    const [itens, setItens] = useState<ItemSacola[]>([]);
    // Taxa e previsão de entrega: as da zona do endereço do cliente; enquanto
    // carrega (ou se falhar), as padrão das Configurações da loja
    const configuracoes = useConfiguracoes();
    const [entregaCliente, setEntregaCliente] = useState<EntregaCliente | null>(null);
    const taxaEntrega = entregaCliente?.taxaEntrega ?? configuracoes.taxaEntrega;
    const previsaoEntrega = entregaCliente?.previsaoEntrega ?? configuracoes.previsaoEntrega;
    const foraDaArea = entregaCliente?.entregamos === false;
    const [enderecoEntrega, setEnderecoEntrega] = useState<EnderecoEntrega | null>(null);
    const [cupom, setCupom] = useState("");
    const [cupomAplicado, setCupomAplicado] = useState<Cupom | null>(null);
    const [mensagemCupom, setMensagemCupom] = useState("");
    const [erroCupom, setErroCupom] = useState(false);

    // Carrega do banco os produtos que o cliente logado escolheu
    // (toda vez que a tela aparece, para pegar o que foi adicionado depois)
    useFocusEffect(useCallback(() => {
        async function carregarSacola() {
            try {
                setItens(await buscarSacola());
            } catch (erro) {
                console.error("Erro ao carregar sacola:", erro);
            }
            try {
                setEnderecoEntrega(await buscarEnderecoEntrega());
            } catch (erro) {
                console.error("Erro ao carregar endereço:", erro);
            }
            // Recarrega ao voltar da tela de endereços (a zona pode ter mudado)
            try {
                setEntregaCliente(await buscarEntregaCliente());
            } catch (erro) {
                console.error("Erro ao carregar taxa de entrega:", erro);
            }
        }

        carregarSacola();
    }, []));

    function alterarQuantidade(id: number, delta: number) {
        const item = itens.find((item) => item.id === id);
        if (!item) return;
        const novaQuantidade = Math.max(1, item.quantidade + delta);
        if (novaQuantidade === item.quantidade) return;

        setItens((atual) =>
            atual.map((item) =>
                item.id === id ? { ...item, quantidade: novaQuantidade } : item
            )
        );
        alterarQuantidadeSacola(id, novaQuantidade).catch((erro) =>
            console.error("Erro ao alterar quantidade:", erro)
        );
    }

    function removerItem(id: number) {
        setItens((atual) => atual.filter((item) => item.id !== id));
        removerDaSacola(id).catch((erro) =>
            console.error("Erro ao remover item:", erro)
        );
    }

    // Valida o cupom na API. Com o campo vazio, remove o cupom aplicado.
    async function aplicarCupom() {
        if (cupom.trim().length === 0) {
            setCupomAplicado(null);
            setMensagemCupom("");
            return;
        }
        try {
            const encontrado = await validarCupom(cupom);
            setCupomAplicado(encontrado);
            setErroCupom(false);
            setMensagemCupom(
                `Cupom ${encontrado.codigo} aplicado: ${encontrado.percentual}% de desconto nos produtos.`
            );
        } catch (e) {
            setCupomAplicado(null);
            setErroCupom(true);
            setMensagemCupom(e instanceof Error ? e.message : "Cupom inválido.");
        }
    }

    const subtotal = itens.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );
    // Fora da área só dá para retirar na loja, que não paga entrega
    const entrega = itens.length > 0 && !foraDaArea ? taxaEntrega : 0;
    const desconto = calcularDesconto(subtotal, cupomAplicado);
    const total = subtotal + entrega - desconto;

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={sacolaStyle.header}>
                            <View style={sacolaStyle.conteudo}>
                                <Image
                                    style={sacolaStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={sacolaStyle.titulo}>Sacola</Text>
                            <Text style={sacolaStyle.subtitulo}>
                                Revise seus itens antes de finalizar
                            </Text>
                        </View>

                        <View style={sacolaStyle.main}>
                            {itens.map((item) => (
                                <View key={item.id} style={sacolaStyle.cardItem}>
                                    <Image style={sacolaStyle.imgItem} source={item.imagem} />
                                    <View style={sacolaStyle.infoItem}>
                                        <View style={sacolaStyle.topoItem}>
                                            <View style={sacolaStyle.infoTexto}>
                                                <Text style={sacolaStyle.nomeItem}>
                                                    {item.nome}
                                                </Text>
                                                <Text
                                                    style={sacolaStyle.descricaoItem}
                                                    numberOfLines={1}
                                                >
                                                    {item.descricao}
                                                </Text>
                                            </View>
                                            <Pressable
                                                style={sacolaStyle.btnLixeira}
                                                onPress={() => removerItem(item.id)}
                                            >
                                                <Image
                                                    style={sacolaStyle.imgLixeira}
                                                    source={require("@/assets/images/img/lixeira.png")}
                                                />
                                            </Pressable>
                                        </View>
                                        <View style={sacolaStyle.rodapeItem}>
                                            <View style={sacolaStyle.precos}>
                                                <Text style={sacolaStyle.precoUnitario}>
                                                    {formatarPreco(item.preco)}
                                                </Text>
                                                <Text style={sacolaStyle.precoItem}>
                                                    {formatarPreco(item.preco * item.quantidade)}
                                                </Text>
                                            </View>
                                            <View style={sacolaStyle.quantidade}>
                                                <Pressable
                                                    style={sacolaStyle.btnQuantidade}
                                                    onPress={() => alterarQuantidade(item.id, -1)}
                                                >
                                                    <Text style={sacolaStyle.txtBtnQuantidade}>
                                                        -
                                                    </Text>
                                                </Pressable>
                                                <Text style={sacolaStyle.txtQuantidade}>
                                                    {item.quantidade}
                                                </Text>
                                                <Pressable
                                                    style={sacolaStyle.btnQuantidade}
                                                    onPress={() => alterarQuantidade(item.id, 1)}
                                                >
                                                    <Text style={sacolaStyle.txtBtnQuantidade}>
                                                        +
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            ))}

                            <View style={sacolaStyle.cupom}>
                                <Text style={sacolaStyle.tituloCupom}>Cupom de desconto</Text>
                                <View style={sacolaStyle.conteudoCupom}>
                                    <TextInput
                                        style={sacolaStyle.inputCupom}
                                        placeholder="Digite seu cupom"
                                        placeholderTextColor={cores.cinzclaro}
                                        value={cupom}
                                        onChangeText={setCupom}
                                    />
                                    <Pressable
                                        style={sacolaStyle.btnCupom}
                                        onPress={aplicarCupom}
                                    >
                                        <Text style={sacolaStyle.txtBtnCupom}>Aplicar</Text>
                                    </Pressable>
                                </View>
                                {mensagemCupom !== "" && (
                                    <Text
                                        style={
                                            erroCupom
                                                ? sacolaStyle.txtErroCupom
                                                : sacolaStyle.txtMensagemCupom
                                        }
                                    >
                                        {mensagemCupom}
                                    </Text>
                                )}
                            </View>

                            <View style={sacolaStyle.cardEntrega}>
                                <Text style={sacolaStyle.labelEntregaEm}>Entrega em :</Text>
                                <View style={sacolaStyle.linhaEndereco}>
                                    <Image
                                        style={sacolaStyle.iconeEntrega}
                                        source={require("@/assets/images/img/delivery-laranja.png")}
                                        resizeMode="stretch"
                                    />
                                    <Text style={sacolaStyle.txtEndereco}>
                                        {enderecoEntrega?.texto ??
                                            "Nenhum endereço cadastrado. Toque em Trocar endereço."}
                                    </Text>
                                </View>
                                <Text style={sacolaStyle.txtTelefone}>
                                    {enderecoEntrega?.telefone ?? ""}
                                </Text>
                                {foraDaArea && (
                                    <Text style={sacolaStyle.txtAvisoEntrega}>
                                        Ainda não entregamos neste endereço. Você pode retirar o
                                        pedido na loja ou trocar o endereço.
                                    </Text>
                                )}
                                <View style={sacolaStyle.linhaRodapeEntrega}>
                                    <Text style={sacolaStyle.txtPrevisaoLabel}>
                                        Entrega estimada em:
                                    </Text>
                                    <Text style={sacolaStyle.txtPrevisaoValor}>
                                        {previsaoEntrega}
                                    </Text>
                                    <Pressable>
                                        <Text style={sacolaStyle.txtTrocarEndereco} onPress={() => router.navigate("/enderecos")}>
                                            Trocar endereço
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            <View style={sacolaStyle.cardResumo}>
                                <View style={sacolaStyle.linhaResumo}>
                                    <Text style={sacolaStyle.txtLabelResumo}>Subtotal</Text>
                                    <Text style={sacolaStyle.txtValorResumo}>
                                        {formatarPrecoResumo(subtotal)}
                                    </Text>
                                </View>
                                <View style={sacolaStyle.linhaResumo}>
                                    <Text style={sacolaStyle.txtLabelResumo}>
                                        {foraDaArea ? "Retirada na loja" : "Entrega"}
                                    </Text>
                                    <Text style={sacolaStyle.txtValorResumo}>
                                        {formatarPrecoResumo(entrega)}
                                    </Text>
                                </View>
                                {cupomAplicado && (
                                    <View style={sacolaStyle.linhaResumo}>
                                        <Text style={sacolaStyle.txtLabelDesconto}>
                                            Desconto
                                        </Text>
                                        <Text style={sacolaStyle.txtCodigoCupom}>
                                            {cupomAplicado.codigo}
                                        </Text>
                                        <Text style={sacolaStyle.txtValorDesconto}>
                                            {formatarPrecoResumo(desconto)}
                                        </Text>
                                    </View>
                                )}
                                <View style={sacolaStyle.divisor} />
                                <View style={sacolaStyle.linhaResumo}>
                                    <Text style={sacolaStyle.txtLabelTotal}>TOTAL</Text>
                                    <Text style={sacolaStyle.txtValorTotal}>
                                        {formatarPrecoResumo(total)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <Pressable
                            style={sacolaStyle.btnFinalizar}
                            onPress={() =>
                                router.push({
                                    pathname: "/pagamento",
                                    params: cupomAplicado ? { cupom: cupomAplicado.codigo } : {},
                                })
                            }
                        >
                            <Text style={sacolaStyle.txtFinalizar}>
                                Continuar para pagamento
                            </Text>
                        </Pressable>
                    </ScrollView>

                    <Pressable
                        style={sacolaStyle.btnVoltar}
                        onPress={() => voltar("/home")}
                    >
                        <Image
                            style={sacolaStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
