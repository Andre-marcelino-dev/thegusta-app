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
import pagamentoStyle from "@/styles/pagamentoStyle";
import Footer from "@/components/footer";

import { cores } from "@/styles/variaveis";

type TipoEntrega = "entrega" | "retirada";
type FormaPagamento = "pix" | "cartao" | "dinheiro";

const itensPedido = [
    { id: 1, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
    { id: 2, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
    { id: 3, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
    { id: 4, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
];

const taxaEntrega = 8.0;
const cupomAplicado = "THEGUSTEX10";

function formatarPrecoResumo(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

export default function PagamentoScreen() {
    const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>("entrega");
    const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>("pix");
    const [observacao, setObservacao] = useState("");

    const subtotal = itensPedido.reduce((soma, item) => soma + item.preco, 0);
    const entrega = tipoEntrega === "entrega" ? taxaEntrega : 0;
    const desconto = cupomAplicado ? subtotal * 0.1053 : 0;
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
                        <View style={pagamentoStyle.header}>
                            <View style={pagamentoStyle.conteudo}>
                                <Pressable onPress={() => router.back()}>
                                    <Image
                                        style={pagamentoStyle.iconeVoltar}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
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
                                    <Pressable>
                                        <Text style={pagamentoStyle.txtAlterar}>Alterar &gt;</Text>
                                    </Pressable>
                                </View>
                                <Text style={pagamentoStyle.txtEnderecoTitulo}>Casa</Text>
                                <Text style={pagamentoStyle.txtEndereco}>
                                    Avenida Marechal Tito, 1500{"\n"}
                                    São Miguel Paulista - São Paulo - SP
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
                                                {item.nome}
                                            </Text>
                                        </View>
                                        <Text style={pagamentoStyle.txtValorItemResumo}>
                                            {formatarPrecoResumo(item.preco)}
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
                                        {formatarPrecoResumo(entrega)}
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

                        <Pressable style={pagamentoStyle.btnConfirmar}>
                            <Text style={pagamentoStyle.txtConfirmar}>Confirma Pedido</Text>
                        </Pressable>
                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
