import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
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
import { buscarPedidos, etapaDoStatus, Pedido, textoDoStatus } from "@/utils/pedidos";

type AbaPedido = "andamento" | "entregues";

const previsaoEntrega = "45 - 60 min";

function iconeDoStatus(etapa: number) {
    if (etapa === 1) return require("@/assets/images/img/aguardando-laranja.png");
    if (etapa === 3) return require("@/assets/images/img/delivery-laranja.png");
    return require("@/assets/images/img/preparando-laranja.png");
}

export default function PedidosScreen() {
    const [aba, setAba] = useState<AbaPedido>("andamento");
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    // Carrega do banco os pedidos do cliente logado
    useFocusEffect(useCallback(() => {
        async function carregarPedidos() {
            try {
                setPedidos(await buscarPedidos());
            } catch (erro) {
                console.error("Erro ao carregar pedidos:", erro);
            }
        }

        carregarPedidos();
    }, []));

    // Aguardando, em preparo e a caminho ficam na primeira aba;
    // finalizados na de entregues. Cancelados não aparecem.
    const pedidosAndamento = pedidos
        .filter((pedido) => [1, 2, 3].includes(etapaDoStatus(pedido.status)))
        .map((pedido) => {
            const etapa = etapaDoStatus(pedido.status);
            return {
                ...pedido,
                statusLabel: etapa === 3 ? "A caminho" : textoDoStatus(etapa),
                statusIcone: iconeDoStatus(etapa),
                previsao: previsaoEntrega,
            };
        });
    const pedidosEntregues = pedidos.filter(
        (pedido) => etapaDoStatus(pedido.status) === 5
    );

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
                                        Em preparo
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

                            {aba === "andamento" &&
                                pedidosAndamento.map((pedido) => (
                                    <View key={pedido.numero} style={pedidosStyle.cardPedido}>
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
                                            {pedido.itens.map((item) => (
                                                <View key={item.id} style={pedidosStyle.linhaItem}>
                                                    <Image
                                                        style={pedidosStyle.imgItem}
                                                        source={item.imagem}
                                                    />
                                                    <Text style={pedidosStyle.txtItem}>{item.nome}</Text>
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

                                        <Pressable
                                            style={pedidosStyle.btnDetalhes}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/detalhesPedido",
                                                    params: { id: pedido.numero },
                                                })
                                            }
                                        >
                                            <Text style={pedidosStyle.txtDetalhes}>
                                                Ver detalhes
                                            </Text>
                                        </Pressable>
                                    </View>
                                ))}

                            {aba === "entregues" &&
                                pedidosEntregues.map((pedido) => (
                                    <View
                                        key={pedido.numero}
                                        style={pedidosStyle.cardPedidoEntregue}
                                    >
                                        <View style={pedidosStyle.topoPedido}>
                                            <View style={pedidosStyle.linhaNumeroPedido}>
                                                <View style={pedidosStyle.iconeCaixaPedidoVerde}>
                                                    <Image
                                                        style={pedidosStyle.imgPedidoVerde}
                                                        source={require("@/assets/images/img/pedido.png")}
                                                    />
                                                </View>
                                                <Text style={pedidosStyle.txtNumeroPedidoVerde}>
                                                    Pedido #{pedido.numero}
                                                </Text>
                                            </View>
                                            <View style={pedidosStyle.badgeEntregue}>
                                                <Image
                                                    style={pedidosStyle.imgBadgeEntregue}
                                                    source={require("@/assets/images/img/entregue-verde.png")}
                                                />
                                                <Text style={pedidosStyle.txtBadgeEntregue}>
                                                    Entregue
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={pedidosStyle.listaItens}>
                                            {pedido.itens.map((item) => (
                                                <View key={item.id} style={pedidosStyle.linhaItem}>
                                                    <Image
                                                        style={pedidosStyle.imgItem}
                                                        source={item.imagem}
                                                    />
                                                    <Text style={pedidosStyle.txtItem}>{item.nome}</Text>
                                                </View>
                                            ))}
                                        </View>

                                        <View style={pedidosStyle.divisorVerde} />

                                        <View style={pedidosStyle.rodapePedidoEntregue}>
                                            <View>
                                                <Text style={pedidosStyle.txtLabelTotal}>Total</Text>
                                                <Text style={pedidosStyle.txtValorTotalVerde}>
                                                    R$ {pedido.total.toFixed(2).replace(".", ",")}
                                                </Text>
                                            </View>
                                            <View style={pedidosStyle.linhaBotoesEntregue}>
                                                <Pressable
                                                    style={pedidosStyle.btnVerDetalhesPeq}
                                                    onPress={() =>
                                                router.push({
                                                    pathname: "/detalhesPedido",
                                                    params: { id: pedido.numero },
                                                })
                                            }
                                                >
                                                    <Text style={pedidosStyle.txtVerDetalhesPeq}>
                                                        Ver detalhes
                                                    </Text>
                                                </Pressable>
                                                <Pressable style={pedidosStyle.btnPedirNovamentePeq}>
                                                    <Text style={pedidosStyle.txtPedirNovamentePeq}>
                                                        Pedir novamente
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                        </View>
                    </ScrollView>

                    <Pressable
                        style={pedidosStyle.btnVoltar}
                        onPress={() =>
                            router.canGoBack() ? router.back() : router.replace("/home")
                        }
                    >
                        <Image
                            style={pedidosStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
