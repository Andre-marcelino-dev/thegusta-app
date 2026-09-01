import { router } from "expo-router";
import { useState } from "react";
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

import { cores } from "@/styles/variaveis";

const itensIniciais = [
    {
        id: 1,
        nome: "Bolo de Banana Fit",
        descricao: "Banana Prata com canela e gergelim",
        preco: 18.8,
        quantidade: 2,
        imagem: require("@/assets/images/img/bolo01.png"),
    },
    {
        id: 2,
        nome: "Bolo de Banana Fit",
        descricao: "Banana Prata com canela e gergelim",
        preco: 18.8,
        quantidade: 3,
        imagem: require("@/assets/images/img/bolo01.png"),
    },
    {
        id: 3,
        nome: "Bolo de Banana Fit",
        descricao: "Banana Prata com canela e gergelim",
        preco: 18.8,
        quantidade: 1,
        imagem: require("@/assets/images/img/bolo01.png"),
    },
];

const taxaEntrega = 6.0;

function formatarPreco(valor: number) {
    return `R$${valor.toFixed(2).replace(".", ",")}`;
}

function formatarPrecoResumo(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function SacolaScreen() {
    const [itens, setItens] = useState(itensIniciais);
    const [cupom, setCupom] = useState("");
    const [cupomAplicado, setCupomAplicado] = useState<string | null>(
        "THEGUSTA10"
    );

    function alterarQuantidade(id: number, delta: number) {
        setItens((atual) =>
            atual.map((item) =>
                item.id === id
                    ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
                    : item
            )
        );
    }

    function removerItem(id: number) {
        setItens((atual) => atual.filter((item) => item.id !== id));
    }

    function aplicarCupom() {
        if (cupom.trim().length === 0) return;
        setCupomAplicado(cupom.trim().toUpperCase());
    }

    const subtotal = itens.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );
    const entrega = itens.length > 0 ? taxaEntrega : 0;
    const desconto = cupomAplicado ? subtotal * 0.1 : 0;
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
                                <Pressable onPress={() => router.back()}>
                                    <Image
                                        style={sacolaStyle.iconeVoltar}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
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
                                            <View>
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
                                            <Pressable onPress={() => removerItem(item.id)}>
                                                <Image
                                                    style={sacolaStyle.imgLixeira}
                                                    source={require("@/assets/images/img/lixeira.png")}
                                                />
                                            </Pressable>
                                        </View>
                                        <View style={sacolaStyle.rodapeItem}>
                                            <Text style={sacolaStyle.precoItem}>
                                                {formatarPreco(item.preco * item.quantidade)}
                                            </Text>
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
                            </View>

                            <View style={sacolaStyle.cardEntrega}>
                                <Text style={sacolaStyle.labelEntregaEm}>Entrega em :</Text>
                                <View style={sacolaStyle.linhaEndereco}>
                                    <Image
                                        style={sacolaStyle.iconeEntrega}
                                        source={require("@/assets/images/img/delivery-laranja.png")}
                                    />
                                    <Text style={sacolaStyle.txtEndereco}>
                                        Avenida Marechal Tito, 1500 - São Miguel Paulista - São
                                        Paulo - SP
                                    </Text>
                                </View>
                                <Text style={sacolaStyle.txtTelefone}>
                                    (11)9999-99999
                                </Text>
                                <View style={sacolaStyle.linhaRodapeEntrega}>
                                    <Text style={sacolaStyle.txtPrevisaoLabel}>
                                        Entrega estimada em:
                                    </Text>
                                    <Text style={sacolaStyle.txtPrevisaoValor}>
                                        45 - 60 min
                                    </Text>
                                    <Pressable>
                                        <Text style={sacolaStyle.txtTrocarEndereco}>
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
                                    <Text style={sacolaStyle.txtLabelResumo}>Entrega</Text>
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
                                            {cupomAplicado}
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
                            onPress={() => router.push("/pagamento")}
                        >
                            <Text style={sacolaStyle.txtFinalizar}>
                                Continuar para pagamento
                            </Text>
                        </Pressable>
                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
