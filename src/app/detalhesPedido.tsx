import { router } from "expo-router";
import { Fragment } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Linking,
    Pressable,
    Text,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import detalhesPedidoStyle from "@/styles/detalhesPedidoStyle";
import Footer from "@/components/footer";

const numeroWhatsappLoja = "5511988161211";

const pedido = {
    numero: 132,
    data: "Hoje, 08:00",
    status: "Em preparo",
    previsao: "40 - 55 min",
    formaPagamento: "Pix",
    observacao: "Nenhuma observação para seu pedido",
};

const itensPedido = [
    { id: 1, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
    { id: 2, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
    { id: 3, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
    { id: 4, nome: "2x Bolo de Banana Fit", preco: 37.6, imagem: require("@/assets/images/img/bolo01.png") },
];

const taxaEntrega = 8.0;
const cupomAplicado = "THEGUSTEX10";

function formatarPreco(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

const etapas = [
    {
        id: 2,
        label: "Em\npreparo",
        icone: require("@/assets/images/img/preparando-verde.png"),
        estado: "atual" as const,
    },
    {
        id: 3,
        label: "Saiu para\nentrega",
        icone: require("@/assets/images/img/delivery-cinza.png"),
        estado: "pendente" as const,
    },
    {
        id: 4,
        label: "Entrega\nrealizada",
        icone: require("@/assets/images/img/entregue-cinza.png"),
        estado: "pendente" as const,
    },
];

export default function DetalhesPedidoScreen() {
    const subtotal = itensPedido.reduce((soma, item) => soma + item.preco, 0);
    const desconto = cupomAplicado ? subtotal * 0.1053 : 0;
    const total = subtotal + taxaEntrega - desconto;

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={detalhesPedidoStyle.header}>
                            <View style={detalhesPedidoStyle.conteudo}>
                                <Pressable
                                    style={detalhesPedidoStyle.btnVoltar}
                                    onPress={() => router.back()}
                                >
                                    <Image
                                        style={detalhesPedidoStyle.iconeVoltar}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
                                <Image
                                    style={detalhesPedidoStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={detalhesPedidoStyle.titulo}>Detalhes do pedido</Text>
                            <Text style={detalhesPedidoStyle.subtitulo}>
                                Acompanhe as informações do seu pedido
                            </Text>
                        </View>

                        <View style={detalhesPedidoStyle.main}>
                            <View style={detalhesPedidoStyle.cardInfoPedido}>
                                <View style={detalhesPedidoStyle.linhaTopo}>
                                    <View style={detalhesPedidoStyle.linhaNumeroPedido}>
                                        <View style={detalhesPedidoStyle.iconeCaixaPedido}>
                                            <Image
                                                style={detalhesPedidoStyle.imgPedido}
                                                source={require("@/assets/images/img/pedido.png")}
                                            />
                                        </View>
                                        <Text
                                            style={detalhesPedidoStyle.txtNumeroPedido}
                                            numberOfLines={1}
                                        >
                                            Pedido #{pedido.numero}
                                        </Text>
                                    </View>
                                    <View style={detalhesPedidoStyle.badgeStatus}>
                                        <Image
                                            style={detalhesPedidoStyle.imgBadgeStatus}
                                            source={require("@/assets/images/img/preparando-verde.png")}
                                        />
                                        <Text style={detalhesPedidoStyle.txtBadgeStatus}>
                                            {pedido.status}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={detalhesPedidoStyle.txtData}>{pedido.data}</Text>
                            </View>

                            <View style={detalhesPedidoStyle.cardEtapas}>
                                <View style={detalhesPedidoStyle.linhaEtapas}>
                                    {etapas.map((etapa, index) => (
                                        <Fragment key={etapa.id}>
                                            <View style={detalhesPedidoStyle.etapaItem}>
                                                <View
                                                    style={[
                                                        detalhesPedidoStyle.circuloEtapa,
                                                        etapa.estado === "atual" &&
                                                            detalhesPedidoStyle.circuloEtapaAtual,
                                                    ]}
                                                >
                                                    <Image
                                                        style={detalhesPedidoStyle.imgEtapa}
                                                        source={etapa.icone}
                                                    />
                                                </View>
                                                <View style={detalhesPedidoStyle.blocoTxtEtapa}>
                                                    {etapa.label.split("\n").map((linha) => (
                                                        <Text
                                                            key={linha}
                                                            style={
                                                                etapa.estado !== "pendente"
                                                                    ? detalhesPedidoStyle.txtEtapaAtivaCompleto
                                                                    : detalhesPedidoStyle.txtEtapa
                                                            }
                                                        >
                                                            {linha}
                                                        </Text>
                                                    ))}
                                                </View>
                                            </View>
                                            {index < etapas.length - 1 && (
                                                <View
                                                    style={[
                                                        detalhesPedidoStyle.linhaConectora,
                                                        etapa.estado !== "pendente" &&
                                                            detalhesPedidoStyle.linhaConectoraAtiva,
                                                    ]}
                                                />
                                            )}
                                        </Fragment>
                                    ))}
                                </View>

                                <View style={detalhesPedidoStyle.caixaPrevisao}>
                                    <Image
                                        style={detalhesPedidoStyle.imgPrevisao}
                                        source={require("@/assets/images/img/delivery-laranja.png")}
                                    />
                                    <Text style={detalhesPedidoStyle.txtPrevisao}>
                                        Previsão estimada {pedido.previsao}
                                    </Text>
                                </View>
                            </View>

                            <View style={detalhesPedidoStyle.card}>
                                <View style={detalhesPedidoStyle.linhaIconeLabel}>
                                    <Image
                                        style={detalhesPedidoStyle.iconeLabelCard}
                                        source={require("@/assets/images/img/documento.png")}
                                    />
                                    <Text style={detalhesPedidoStyle.labelCard}>
                                        Resumo do Pedido
                                    </Text>
                                </View>

                                {itensPedido.map((item) => (
                                    <View key={item.id} style={detalhesPedidoStyle.itemResumo}>
                                        <View style={detalhesPedidoStyle.linhaItemResumo}>
                                            <Image
                                                style={detalhesPedidoStyle.imgItemResumo}
                                                source={item.imagem}
                                            />
                                            <Text style={detalhesPedidoStyle.txtItemResumo}>
                                                {item.nome}
                                            </Text>
                                        </View>
                                        <Text style={detalhesPedidoStyle.txtValorItemResumo}>
                                            {formatarPreco(item.preco)}
                                        </Text>
                                    </View>
                                ))}

                                <View style={detalhesPedidoStyle.divisor} />

                                <View style={detalhesPedidoStyle.linhaResumo}>
                                    <Text style={detalhesPedidoStyle.txtLabelResumo}>Subtotal</Text>
                                    <Text style={detalhesPedidoStyle.txtValorResumo}>
                                        {formatarPreco(subtotal)}
                                    </Text>
                                </View>
                                <View style={detalhesPedidoStyle.linhaResumo}>
                                    <Text style={detalhesPedidoStyle.txtLabelResumo}>Entrega</Text>
                                    <Text style={detalhesPedidoStyle.txtValorResumo}>
                                        {formatarPreco(taxaEntrega)}
                                    </Text>
                                </View>
                                {cupomAplicado && (
                                    <View style={detalhesPedidoStyle.linhaResumo}>
                                        <Text style={detalhesPedidoStyle.txtLabelDesconto}>
                                            Desconto
                                        </Text>
                                        <Text style={detalhesPedidoStyle.txtCodigoCupom}>
                                            {cupomAplicado}
                                        </Text>
                                        <Text style={detalhesPedidoStyle.txtValorDesconto}>
                                            -{formatarPreco(desconto)}
                                        </Text>
                                    </View>
                                )}
                                <View style={detalhesPedidoStyle.divisor} />
                                <View style={detalhesPedidoStyle.linhaResumo}>
                                    <Text style={detalhesPedidoStyle.txtLabelTotal}>TOTAL</Text>
                                    <Text style={detalhesPedidoStyle.txtValorTotal}>
                                        {formatarPreco(total)}
                                    </Text>
                                </View>
                            </View>

                            <View style={detalhesPedidoStyle.card}>
                                <View style={detalhesPedidoStyle.linhaLabelCard}>
                                    <View style={detalhesPedidoStyle.linhaIconeLabel}>
                                        <Image
                                            style={detalhesPedidoStyle.iconeLabelCard}
                                            source={require("@/assets/images/img/carteira.png")}
                                        />
                                        <Text style={detalhesPedidoStyle.labelCard}>
                                            Forma de Pagamento
                                        </Text>
                                    </View>
                                    <View style={detalhesPedidoStyle.pillPagamento}>
                                        <Image
                                            style={detalhesPedidoStyle.imgPagamento}
                                            source={require("@/assets/images/img/pix.png")}
                                        />
                                        <Text style={detalhesPedidoStyle.txtPagamento}>
                                            {pedido.formaPagamento}
                                        </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={detalhesPedidoStyle.card}>
                                <View style={detalhesPedidoStyle.linhaIconeLabel}>
                                    <Image
                                        style={detalhesPedidoStyle.iconeLabelCard}
                                        source={require("@/assets/images/img/mensagem.png")}
                                    />
                                    <Text style={detalhesPedidoStyle.labelCard}>Observação</Text>
                                </View>
                                <Text style={detalhesPedidoStyle.txtObservacao}>
                                    {pedido.observacao}
                                </Text>
                            </View>

                            <View style={detalhesPedidoStyle.linhaAcoes}>
                                <Pressable
                                    style={detalhesPedidoStyle.btnCopia}
                                    onPress={() =>
                                        Linking.openURL(
                                            `https://wa.me/${numeroWhatsappLoja}?text=${encodeURIComponent(
                                                `Olá! Gostaria de falar sobre o pedido #${pedido.numero}.`
                                            )}`
                                        )
                                    }
                                >
                                    <Image
                                        style={detalhesPedidoStyle.imgAcao}
                                        source={require("@/assets/images/img/fale_conosco.png")}
                                    />
                                    <Text style={detalhesPedidoStyle.txtCopia}>
                                        Falar com a loja
                                    </Text>
                                </Pressable>
                                <Pressable style={detalhesPedidoStyle.btnPedirNovamente}>
                                    <Image
                                        style={detalhesPedidoStyle.imgAcaoBranco}
                                        source={require("@/assets/images/img/repetir.png")}
                                    />
                                    <Text style={detalhesPedidoStyle.txtPedirNovamente}onPress={()=>router.navigate('/pagamento')}>
                                        Pedir novamente
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
