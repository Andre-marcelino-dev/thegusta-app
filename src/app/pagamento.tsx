import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Alert,
    Image,
    ImageBackground,
    Linking,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import pagamentoStyle from "@/styles/pagamentoStyle";
import Footer from "@/components/footer";

import { cores } from "@/styles/variaveis";
import { buscarSacola, ItemSacola } from "@/utils/sacola";
import { criarPedido } from "@/utils/pedidos";
import { buscarEnderecoEntrega, EnderecoEntrega } from "@/utils/enderecos";

type TipoEntrega = "entrega" | "retirada";
type FormaPagamento = "pix" | "cartao" | "dinheiro";

const taxaEntrega = 6.0;
const numeroWhatsapp = "5511988161211";
const rotulosEntrega: Record<TipoEntrega, string> = {
    entrega: "Entrega",
    retirada: "Retirada",
};
const rotulosPagamento: Record<FormaPagamento, string> = {
    pix: "Pix",
    cartao: "Cartão",
    dinheiro: "Dinheiro",
};
const menuItens = [
    {
        id: 1,
        rotulo: "Home",
        icone: require("@/assets/images/img/home.png"),
        rota: "/home",
    },
    {
        id: 2,
        rotulo: "Cardápio",
        icone: require("@/assets/images/img/cardapio.png"),
        rota: "/cardapio",
    },
    {
        id: 3,
        rotulo: "Sacola",
        icone: require("@/assets/images/img/sacola.png"),
        rota: "/sacola",
    },
    {
        id: 4,
        rotulo: "Pedido",
        icone: require("@/assets/images/img/pedido.png"),
        rota: null,
    },
    {
        id: 5,
        rotulo: "Config",
        icone: require("@/assets/images/img/config.png"),
        rota: null,
    },
];
 
function formatarPrecoResumo(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}
 
export default function PagamentoScreen() {
    const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>("entrega");
    const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>(
        "pix"
    );
    const [observacao, setObservacao] = useState("");
    const [itensPedido, setItensPedido] = useState<ItemSacola[]>([]);
    const [enderecoEntrega, setEnderecoEntrega] = useState<EnderecoEntrega | null>(null);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");

    // Os itens do pedido são os da sacola do cliente logado
    useFocusEffect(useCallback(() => {
        async function carregarItens() {
            try {
                setItensPedido(await buscarSacola());
            } catch (e) {
                console.error("Erro ao carregar a sacola:", e);
            }
            try {
                setEnderecoEntrega(await buscarEnderecoEntrega());
            } catch (e) {
                console.error("Erro ao carregar endereço:", e);
            }
        }

        carregarItens();
    }, []));

    const subtotal = itensPedido.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );
    const valorEntrega = tipoEntrega === "entrega" ? taxaEntrega : 0;
    // Cupom ainda não é validado no banco, então o pedido sai sem desconto
    const desconto = 0;
    const cupomAplicado: string | null = null;
    const total = subtotal + valorEntrega - desconto;
 
    async function confirmarPedido() {
        if (enviando) return;
        setErro("");

        if (itensPedido.length === 0) {
            setErro("Sua sacola está vazia.");
            return;
        }
        if (tipoEntrega === "entrega" && !enderecoEntrega) {
            setErro("Cadastre um endereço de entrega ou escolha Retirada.");
            return;
        }

        // 1. Grava o pedido no banco (a API esvazia a sacola)
        setEnviando(true);
        let numeroPedido: number;
        try {
            const pedido = await criarPedido({
                entrega: tipoEntrega === "entrega",
                forma_pagamento: formaPagamento,
                observacao: observacao.trim() || undefined,
            });
            numeroPedido = pedido.numero;
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível fazer o pedido.");
            setEnviando(false);
            return;
        }
        setEnviando(false);

        // 2. Avisa a loja pelo WhatsApp, como antes, agora com o número do pedido
        const linhasItens = itensPedido
            .map((item) => `- ${item.quantidade}x ${item.nome}`)
            .join("\n");
 
        const linhasEndereco =
            tipoEntrega === "entrega"
                ? `\n*Endereço:* ${enderecoEntrega?.texto ?? ""}\n*Telefone:* ${enderecoEntrega?.telefone ?? ""}`
                : "";

        const linhaObservacao = observacao.trim()
            ? `\n*Observação:* ${observacao.trim()}`
            : "";

        const mensagem = `*Novo pedido #${numeroPedido} - TheGusta*\n\n${linhasItens}\n\n*Entrega/Retirada:* ${rotulosEntrega[tipoEntrega]}${linhasEndereco}\n*Forma de pagamento:* ${rotulosPagamento[formaPagamento]}${linhaObservacao}\n\n*Subtotal:* ${formatarPrecoResumo(
            subtotal
        )}\n*Entrega:* ${formatarPrecoResumo(
            valorEntrega
        )}\n*Total:* ${formatarPrecoResumo(total)}`;
 
        const textoCodificado = encodeURIComponent(mensagem);
        const urlApp = `whatsapp://send?phone=${numeroWhatsapp}&text=${textoCodificado}`;
        const urlWeb = `https://wa.me/${numeroWhatsapp}?text=${textoCodificado}`;
 
        let whatsappAberto = false;
        if (Platform.OS !== "web") {
            try {
                await Linking.openURL(urlApp);
                whatsappAberto = true;
            } catch {
                // WhatsApp não instalado, segue para o link web
            }
        }
 
        if (!whatsappAberto) {
            try {
                await Linking.openURL(urlWeb);
            } catch {
                Alert.alert(
                    "WhatsApp não encontrado",
                    "Seu pedido foi feito, mas não foi possível abrir o WhatsApp."
                );
            }
        }

        // 3. Mostra o pedido que acabou de ser criado
        router.replace({
            pathname: "/detalhesPedido",
            params: { id: numeroPedido },
        });
    }
    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={pagamentoStyle.header}>
                            <View style={pagamentoStyle.conteudo}>
                                <Image
                                    style={pagamentoStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={pagamentoStyle.titulo}>Pagamento</Text>
                            <Text style={pagamentoStyle.subtitulo}>
                                Confirme a entrega e forma de pagamento
                            </Text>
                        </View>

                        <View style={pagamentoStyle.main}>
                            <View style={pagamentoStyle.card}>
                                <View style={pagamentoStyle.linhaTopoCard}>
                                    <View style={pagamentoStyle.linhaObservacao}>
                                        <Image
                                            style={pagamentoStyle.iconeEndereco}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={pagamentoStyle.labelCard}>
                                            Endereço de entrega:
                                        </Text>
                                    </View>
                                    <Pressable
                                        onPress={() => router.push("/enderecos")}
                                    >
                                        <Text style={pagamentoStyle.txtAlterar}>Alterar &gt;</Text>
                                    </Pressable>
                                </View>
                                <Text style={pagamentoStyle.txtEnderecoTitulo}>
                                    {enderecoEntrega?.nome ?? "Sem endereço"}
                                </Text>
                                <Text style={pagamentoStyle.txtEndereco}>
                                    {enderecoEntrega?.texto ??
                                        "Toque em Alterar para cadastrar um endereço."}
                                </Text>
                            </View>

                            <View style={pagamentoStyle.card}>
                                <View style={pagamentoStyle.linhaEntregaRetirada}>
                                    <View style={pagamentoStyle.segmentado}>
                                        <Pressable
                                            style={[
                                                pagamentoStyle.segmentoItem,
                                                tipoEntrega === "entrega" &&
                                                    pagamentoStyle.segmentoItemAtivo,
                                            ]}
                                            onPress={() => setTipoEntrega("entrega")}
                                        >
                                            <Text
                                                style={[
                                                    pagamentoStyle.txtSegmento,
                                                    tipoEntrega === "entrega" &&
                                                        pagamentoStyle.txtSegmentoAtivo,
                                                ]}
                                            >
                                                Entrega
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            style={[
                                                pagamentoStyle.segmentoItem,
                                                tipoEntrega === "retirada" &&
                                                    pagamentoStyle.segmentoItemAtivo,
                                            ]}
                                            onPress={() => setTipoEntrega("retirada")}
                                        >
                                            <Text
                                                style={[
                                                    pagamentoStyle.txtSegmento,
                                                    tipoEntrega === "retirada" &&
                                                        pagamentoStyle.txtSegmentoAtivo,
                                                ]}
                                            >
                                                Retirada
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View style={pagamentoStyle.previsao}>
                                        <Text style={pagamentoStyle.txtPrevisaoValor}>
                                            45 - 60 min
                                        </Text>
                                        <Text style={pagamentoStyle.txtPrevisaoLabel}>
                                            Previsto
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={pagamentoStyle.card}>
                                <View style={pagamentoStyle.linhaObservacao}>
                                    <Image
                                        style={pagamentoStyle.iconeCarteira}
                                        source={require("@/assets/images/img/carteira.png")}
                                    />
                                    <Text style={pagamentoStyle.labelCard}>Forma de Pagamento</Text>
                                </View>
                                <View style={pagamentoStyle.segmentado3}>
                                    <Pressable
                                        style={[
                                            pagamentoStyle.segmentoItem3,
                                            formaPagamento === "pix" &&
                                                pagamentoStyle.segmentoItemAtivo,
                                        ]}
                                        onPress={() => setFormaPagamento("pix")}
                                    >
                                        <Text
                                            style={[
                                                pagamentoStyle.txtSegmento,
                                                formaPagamento === "pix" &&
                                                    pagamentoStyle.txtSegmentoAtivo,
                                            ]}
                                        >
                                            Pix
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={[
                                            pagamentoStyle.segmentoItem3,
                                            formaPagamento === "cartao" &&
                                                pagamentoStyle.segmentoItemAtivo,
                                        ]}
                                        onPress={() => setFormaPagamento("cartao")}
                                    >
                                        <Text
                                            style={[
                                                pagamentoStyle.txtSegmento,
                                                formaPagamento === "cartao" &&
                                                    pagamentoStyle.txtSegmentoAtivo,
                                            ]}
                                        >
                                            Cartão
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        style={[
                                            pagamentoStyle.segmentoItem3,
                                            formaPagamento === "dinheiro" &&
                                                pagamentoStyle.segmentoItemAtivo,
                                        ]}
                                        onPress={() => setFormaPagamento("dinheiro")}
                                    >
                                        <Text
                                            style={[
                                                pagamentoStyle.txtSegmento,
                                                formaPagamento === "dinheiro" &&
                                                    pagamentoStyle.txtSegmentoAtivo,
                                            ]}
                                        >
                                            Dinheiro
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>

                            <View style={pagamentoStyle.card}>
                                <View style={pagamentoStyle.linhaObservacao}>
                                    <Image
                                        style={pagamentoStyle.iconeObservacao}
                                        source={require("@/assets/images/img/mensagem.png")}
                                    />
                                    <Text style={pagamentoStyle.labelCard}>Observação</Text>
                                </View>
                                <TextInput
                                    style={pagamentoStyle.inputObservacao}
                                    placeholder="Alguma Observação para seu pedido"
                                    placeholderTextColor={cores.cinzclaro}
                                    value={observacao}
                                    onChangeText={setObservacao}
                                    multiline
                                />
                            </View>

                            <View style={pagamentoStyle.card}>
                                <View style={pagamentoStyle.linhaObservacao}>
                                    <Image
                                        style={pagamentoStyle.iconeResumo}
                                        source={require("@/assets/images/img/documento.png")}
                                    />
                                    <Text style={pagamentoStyle.labelCard}>Resumo do Pedido</Text>
                                </View>

                                {itensPedido.map((item) => (
                                    <View key={item.id} style={pagamentoStyle.itemResumo}>
                                        <View style={pagamentoStyle.linhaItemResumo}>
                                            <Image
                                                style={pagamentoStyle.imgItemResumo}
                                                source={item.imagem}
                                            />
                                            <Text style={pagamentoStyle.txtItemResumo}>
                                                {item.quantidade}x {item.nome}
                                            </Text>
                                        </View>
                                        <Text style={pagamentoStyle.txtValorItemResumo}>
                                            {formatarPrecoResumo(item.preco * item.quantidade)}
                                        </Text>
                                    </View>
                                ))}

                                <View style={pagamentoStyle.divisor} />

                                <View style={pagamentoStyle.linhaResumo}>
                                    <Text style={pagamentoStyle.txtLabelResumo}>Subtotal</Text>
                                    <Text style={pagamentoStyle.txtValorResumo}>
                                        {formatarPrecoResumo(subtotal)}
                                    </Text>
                                </View>
                                <View style={pagamentoStyle.linhaResumo}>
                                    <Text style={pagamentoStyle.txtLabelResumo}>Entrega</Text>
                                    <Text style={pagamentoStyle.txtValorResumo}>
                                        {formatarPrecoResumo(valorEntrega)}
                                    </Text>
                                </View>
                                {cupomAplicado && (
                                    <View style={pagamentoStyle.linhaResumo}>
                                        <Text style={pagamentoStyle.txtLabelDesconto}>
                                            Desconto
                                        </Text>
                                        <Text style={pagamentoStyle.txtCodigoCupom}>
                                            {cupomAplicado}
                                        </Text>
                                        <Text style={pagamentoStyle.txtValorDesconto}>
                                            {formatarPrecoResumo(desconto)}
                                        </Text>
                                    </View>
                                )}
                                <View style={pagamentoStyle.divisor} />
                                <View style={pagamentoStyle.linhaResumo}>
                                    <Text style={pagamentoStyle.txtLabelTotal}>TOTAL</Text>
                                    <Text style={pagamentoStyle.txtValorTotal}>
                                        {formatarPrecoResumo(total)}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {erro !== "" && <Text style={pagamentoStyle.txtErro}>{erro}</Text>}

                        <Pressable
                            style={pagamentoStyle.btnConfirmar}
                            onPress={confirmarPedido}
                            disabled={enviando}
                        >
                            <Text style={pagamentoStyle.txtConfirmar}>
                                {enviando ? "Enviando pedido..." : "Confirma Pedido"}
                            </Text>
                        </Pressable>
                    </ScrollView>

                    <Pressable
                        style={pagamentoStyle.btnVoltar}
                        onPress={() =>
                            router.canGoBack() ? router.back() : router.replace("/sacola")
                        }
                    >
                        <Image
                            style={pagamentoStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
