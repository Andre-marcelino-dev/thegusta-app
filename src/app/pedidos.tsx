import { router } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Pressable,
    Text,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import pedidosStyle from "@/styles/pedidosStyle";
import Footer from "@/components/footer";

type AbaPedido = "andamento" | "entregues";

const pedidosAndamento = [
    {
        id: 1,
        numero: 1035,
        statusLabel: "Aguardando",
        statusIcone: require("@/assets/images/img/aguardando-laranja.png"),
        itens: ["2x Bolo de Banana Fit", "2x Bolo de Banana Fit"],
        total: 142.56,
        previsao: "45 - 60 min",
    },
    {
        id: 2,
        numero: 1032,
        statusLabel: "Em preparo",
        statusIcone: require("@/assets/images/img/preparando-laranja.png"),
        itens: ["2x Bolo de Banana Fit", "2x Bolo de Banana Fit"],
        total: 142.56,
        previsao: "45 - 60 min",
    },
    {
        id: 3,
        numero: 1030,
        statusLabel: "A caminho",
        statusIcone: require("@/assets/images/img/delivery-laranja.png"),
        itens: ["2x Bolo de Banana Fit", "2x Bolo de Banana Fit"],
        total: 142.56,
        previsao: "35 - 60 min",
    },
];

const pedidosEntregues = [
    {
        id: 4,
        numero: 1021,
        statusLabel: "Entregue",
        statusIcone: require("@/assets/images/img/entregue-laranja.png"),
        itens: ["2x Bolo de Banana Fit", "2x Bolo de Banana Fit"],
        total: 142.56,
        previsao: "Entregue",
    },
];

export default function PedidosScreen() {
    const [aba, setAba] = useState<AbaPedido>("andamento");

    const pedidos = aba === "andamento" ? pedidosAndamento : pedidosEntregues;

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={pedidosStyle.header}>
                            <View style={pedidosStyle.conteudo}>
                                <Pressable
                                    style={pedidosStyle.btnVoltar}
                                    onPress={() => router.back()}
                                >
                                    <Image
                                        style={pedidosStyle.iconeVoltar}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
                                <Image
                                    style={pedidosStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={pedidosStyle.titulo}>Meus pedidos</Text>
                            <Text style={pedidosStyle.subtitulo}>
                                Acompanhe seus pedidos e seu histórico
                            </Text>
                        </View>

                        <View style={pedidosStyle.main}>
                            <View style={pedidosStyle.abas}>
                                <Pressable
                                    style={[
                                        pedidosStyle.aba,
                                        aba === "andamento" && pedidosStyle.abaAtiva,
                                    ]}
                                    onPress={() => setAba("andamento")}
                                >
                                    <Text
                                        style={[
                                            pedidosStyle.txtAba,
                                            aba === "andamento" && pedidosStyle.txtAbaAtiva,
                                        ]}
                                    >
                                        Em andamento
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={[
                                        pedidosStyle.aba,
                                        aba === "entregues" && pedidosStyle.abaAtiva,
                                    ]}
                                    onPress={() => setAba("entregues")}
                                >
                                    <Text
                                        style={[
                                            pedidosStyle.txtAba,
                                            aba === "entregues" && pedidosStyle.txtAbaAtiva,
                                        ]}
                                    >
                                        Entregues
                                    </Text>
                                </Pressable>
                            </View>

                            {pedidos.map((pedido) => (
                                <View key={pedido.id} style={pedidosStyle.cardPedido}>
                                    <View style={pedidosStyle.topoPedido}>
                                        <View style={pedidosStyle.linhaNumeroPedido}>
                                            <View style={pedidosStyle.iconeCaixaPedido}>
                                                <Image
                                                    style={pedidosStyle.imgPedido}
                                                    source={require("@/assets/images/img/pedido.png")}
                                                />
                                            </View>
                                            <Text style={pedidosStyle.txtNumeroPedido}>
                                                Pedido #{pedido.numero}
                                            </Text>
                                        </View>
                                        <View style={pedidosStyle.linhaStatus}>
                                            <Image
                                                style={pedidosStyle.imgStatus}
                                                source={pedido.statusIcone}
                                            />
                                            <Text style={pedidosStyle.txtStatus}>
                                                {pedido.statusLabel}
                                            </Text>
                                        </View>
                                    </View>

                                    <View style={pedidosStyle.listaItens}>
                                        {pedido.itens.map((item, index) => (
                                            <View key={index} style={pedidosStyle.linhaItem}>
                                                <Image
                                                    style={pedidosStyle.imgItem}
                                                    source={require("@/assets/images/img/bolo01.png")}
                                                />
                                                <Text style={pedidosStyle.txtItem}>{item}</Text>
                                            </View>
                                        ))}
                                    </View>

                                    <View style={pedidosStyle.divisor} />

                                    <View style={pedidosStyle.rodapePedido}>
                                        <View>
                                            <Text style={pedidosStyle.txtLabelTotal}>Total</Text>
                                            <Text style={pedidosStyle.txtValorTotal}>
                                                R$ {pedido.total.toFixed(2).replace(".", ",")}
                                            </Text>
                                        </View>
                                        <View style={pedidosStyle.previsao}>
                                            <View style={pedidosStyle.linhaPrevisao}>
                                                <Image
                                                    style={pedidosStyle.imgPrevisao}
                                                    source={require("@/assets/images/img/previsao.png")}
                                                />
                                                <Text style={pedidosStyle.txtValorPrevisao}>
                                                    {pedido.previsao}
                                                </Text>
                                            </View>
                                            <Text style={pedidosStyle.txtLabelPrevisao}>
                                                Previsto
                                            </Text>
                                        </View>
                                    </View>

                                    <Pressable style={pedidosStyle.btnDetalhes}>
                                        <Text style={pedidosStyle.txtDetalhes}>Ver detalhes</Text>
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
