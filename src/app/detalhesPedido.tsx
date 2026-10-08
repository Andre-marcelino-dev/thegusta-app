import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Fragment, useCallback, useState } from "react";
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
import { buscarPedido, etapaDoStatus, Pedido, textoDoStatus } from "@/utils/pedidos";

const numeroWhatsappLoja = "5511988161211";

const previsaoEntrega = "40 - 55 min";

// Usado enquanto a API carrega
const pedidoVazio: Pedido = {
    numero: 0,
    data: "",
    status: "",
    formaPagamento: "",
    observacao: "",
    cupom: null,
    desconto: 0,
    total: 0,
    itens: [],
};

function formatarPreco(valor: number) {
    return `R$ ${valor.toFixed(2).replace(".", ",")}`;
}

const etapasPedido = [
    {
        id: 2,
        label: "Em\npreparo",
        iconeAtivo: require("@/assets/images/img/preparando-verde.png"),
        iconePendente: require("@/assets/images/img/preparando-cinza.png"),
    },
    {
        id: 3,
        label: "Saiu para\nentrega",
        iconeAtivo: require("@/assets/images/img/delivery-verde.png"),
        iconePendente: require("@/assets/images/img/delivery-cinza.png"),
    },
    {
        id: 4,
        label: "Entrega\nrealizada",
        iconeAtivo: require("@/assets/images/img/entregue-verde.png"),
        iconePendente: require("@/assets/images/img/entregue-cinza.png"),
    },
];

function iconePagamento(forma: string) {
    const valor = forma.toLowerCase();
    if (valor.includes("pix")) return require("@/assets/images/img/pix.png");
    if (valor.includes("cart") || valor.includes("créd") || valor.includes("déb"))
        return require("@/assets/images/img/cartao.png");
    return require("@/assets/images/img/carteira.png");
}

export default function DetalhesPedidoScreen() {
    // Número do pedido vindo da lista (?id=). Sem ele, mostra o mais recente.
    const { id } = useLocalSearchParams<{ id?: string }>();
    const [pedido, setPedido] = useState<Pedido>(pedidoVazio);

    // Carrega do banco o pedido do cliente logado
    useFocusEffect(useCallback(() => {
        async function carregarPedido() {
            try {
                const pedidoApi = await buscarPedido(id ? Number(id) : undefined);
                if (pedidoApi) setPedido(pedidoApi);
            } catch (erro) {
                console.error("Erro ao carregar pedido:", erro);
            }
        }

        carregarPedido();
    }, [id]));

    const itensPedido = pedido.itens;
    const etapaAtual = etapaDoStatus(pedido.status);
    const etapas = etapasPedido.map((etapa) => {
        const estado: "completo" | "atual" | "pendente" =
            etapa.id < etapaAtual ? "completo" : etapa.id === etapaAtual ? "atual" : "pendente";
        return {
            ...etapa,
            estado,
            icone: estado === "pendente" ? etapa.iconePendente : etapa.iconeAtivo,
        };
    });
    const iconeStatus =
        etapas.find((etapa) => etapa.estado === "atual")?.icone ??
        (etapaAtual === 5 ? etapasPedido[2].iconeAtivo : etapasPedido[0].iconePendente);

    const subtotal = itensPedido.reduce((soma, item) => soma + item.preco, 0);
    const desconto = pedido.desconto;
    const cupomAplicado = pedido.cupom;
    const total = pedido.total;
    // Não há coluna de frete: é o que sobra do total depois dos itens e do desconto
    const taxaEntrega = Math.max(0, total + desconto - subtotal);

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
                                            source={iconeStatus}
                                        />
                                        <Text style={detalhesPedidoStyle.txtBadgeStatus}>
                                            {textoDoStatus(etapaAtual)}
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
                                        Previsão estimada {previsaoEntrega}
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
                                {desconto > 0 && (
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
                                            source={iconePagamento(pedido.formaPagamento)}
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

                    <Pressable
                        style={detalhesPedidoStyle.btnVoltar}
                        onPress={() =>
                            router.canGoBack() ? router.back() : router.replace("/pedidos")
                        }
                    >
                        <Image
                            style={detalhesPedidoStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
