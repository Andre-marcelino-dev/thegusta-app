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
import depoimentosStyle from "@/styles/depoimentosStyle";
import Footer from "@/components/footer";
import { cores } from "@/styles/variaveis";

const avaliacoes = [
    {
        id: 1,
        nota: 4,
        texto:
            "Produtos deliciosos e saudáveis! O sabor é incrível e a entrega foi super rápida. Já virei fã da The Gusta.",
    },
    {
        id: 2,
        nota: 4,
        texto:
            "Produtos deliciosos e saudáveis! O sabor é incrível e a entrega foi super rápida. Já virei fã da The Gusta.",
    },
    {
        id: 3,
        nota: 4,
        texto:
            "Produtos deliciosos e saudáveis! O sabor é incrível e a entrega foi super rápida. Já virei fã da The Gusta.",
    },
];

export default function DepoimentosScreen() {
    const [notaSelecionada, setNotaSelecionada] = useState(4);
    const [depoimento, setDepoimento] = useState("");

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={depoimentosStyle.header}>
                            <View style={depoimentosStyle.conteudo}>
                                <Image
                                    style={depoimentosStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={depoimentosStyle.titulo}>Depoimentos</Text>
                            <Text style={depoimentosStyle.subtitulo}>
                                Compartilhe sua experiência com a The Gusta
                            </Text>
                        </View>

                        <View style={depoimentosStyle.main}>
                            <View style={depoimentosStyle.cardNovo}>
                                <Text style={depoimentosStyle.tituloCardNovo}>
                                    Deixe seu depoimento
                                </Text>

                                <Text style={depoimentosStyle.labelCampo}>
                                    Sua avaliação
                                </Text>
                                <View style={depoimentosStyle.linhaEstrelas}>
                                    {[1, 2, 3, 4, 5].map((numero) => (
                                        <Pressable
                                            key={numero}
                                            onPress={() => setNotaSelecionada(numero)}
                                        >
                                            <Text
                                                style={[
                                                    depoimentosStyle.estrela,
                                                    numero > notaSelecionada &&
                                                        depoimentosStyle.estrelaVazia,
                                                ]}
                                            >
                                                {numero <= notaSelecionada ? "★" : "☆"}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>

                                <Text style={depoimentosStyle.labelCampo}>
                                    Seu depoimento
                                </Text>
                                <TextInput
                                    style={depoimentosStyle.inputDepoimento}
                                    placeholder="Conte como foi sua experiência, sabor, atendimento ou entrega."
                                    placeholderTextColor={cores.cinzclaro}
                                    multiline
                                    numberOfLines={4}
                                    value={depoimento}
                                    onChangeText={setDepoimento}
                                />

                                <Pressable style={depoimentosStyle.btnEnviar}>
                                    <Text style={depoimentosStyle.txtEnviar}>
                                        Enviar depoimento
                                    </Text>
                                </Pressable>
                            </View>

                            <Text style={depoimentosStyle.tituloSecao}>
                                Suas avaliações
                            </Text>

                            {avaliacoes.map((avaliacao) => (
                                <View key={avaliacao.id} style={depoimentosStyle.card}>
                                    <View style={depoimentosStyle.linhaEstrelasCard}>
                                        {[1, 2, 3, 4, 5].map((numero) => (
                                            <Text
                                                key={numero}
                                                style={[
                                                    depoimentosStyle.estrelaCard,
                                                    numero > avaliacao.nota &&
                                                        depoimentosStyle.estrelaVazia,
                                                ]}
                                            >
                                                {numero <= avaliacao.nota ? "★" : "☆"}
                                            </Text>
                                        ))}
                                    </View>
                                    <Text style={depoimentosStyle.txtAvaliacao}>
                                        {avaliacao.texto}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <Pressable
                        style={depoimentosStyle.btnVoltar}
                        onPress={() => router.back()}
                    >
                        <Image
                            style={depoimentosStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
