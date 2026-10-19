import { useFocusEffect } from "expo-router";
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
import depoimentosStyle from "@/styles/depoimentosStyle";
import Footer from "@/components/footer";
import { voltar } from "@/utils/navegacao";
import { cores } from "@/styles/variaveis";
import { buscarDepoimentos, Depoimento, enviarDepoimento } from "@/utils/depoimentos";

// Cor da etiqueta de cada situação
const corSituacao: Record<Depoimento["status"], { fundo: string; texto: string }> = {
    PENDENTE: { fundo: cores.laranjaclaro, texto: "#b36b00" },
    APROVADO: { fundo: cores.verdeClaro, texto: cores.verde },
    RECUSADO: { fundo: "#eeeeee", texto: "#777777" },
};

// "2026-10-19 10:17:17" -> "19/10/2026"
function dataParaTela(data: string) {
    const [ano, mes, dia] = data.slice(0, 10).split("-");
    return dia && mes && ano ? `${dia}/${mes}/${ano}` : "";
}

export default function DepoimentosScreen() {
    const [notaSelecionada, setNotaSelecionada] = useState(4);
    const [depoimento, setDepoimento] = useState("");
    const [avaliacoes, setAvaliacoes] = useState<Depoimento[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    const carregar = useCallback(() => {
        buscarDepoimentos()
            .then(setAvaliacoes)
            .catch((e) => console.error("Erro ao carregar depoimentos:", e))
            .finally(() => setCarregando(false));
    }, []);

    useFocusEffect(carregar);

    async function enviar() {
        setErro("");
        setSucesso("");
        if (depoimento.trim().length < 5) {
            return setErro("Escreva o seu depoimento (pelo menos 5 caracteres).");
        }

        setEnviando(true);
        try {
            setSucesso(await enviarDepoimento(notaSelecionada, depoimento));
            setDepoimento("");
            carregar();
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível enviar o depoimento.");
        } finally {
            setEnviando(false);
        }
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
                                    maxLength={1000}
                                />

                                {erro ? <Text style={depoimentosStyle.txtErro}>{erro}</Text> : null}
                                {sucesso ? (
                                    <Text style={depoimentosStyle.txtSucesso}>{sucesso}</Text>
                                ) : null}

                                <Pressable
                                    style={[depoimentosStyle.btnEnviar, enviando && { opacity: 0.6 }]}
                                    onPress={enviar}
                                    disabled={enviando}
                                >
                                    <Text style={depoimentosStyle.txtEnviar}>
                                        {enviando ? "Enviando..." : "Enviar depoimento"}
                                    </Text>
                                </Pressable>
                            </View>

                            <Text style={depoimentosStyle.tituloSecao}>
                                Suas avaliações
                            </Text>

                            {!carregando && avaliacoes.length === 0 ? (
                                <Text style={depoimentosStyle.txtVazio}>
                                    Você ainda não enviou nenhum depoimento.
                                </Text>
                            ) : null}

                            {avaliacoes.map((avaliacao) => (
                                <View key={avaliacao.id} style={depoimentosStyle.card}>
                                    <View style={depoimentosStyle.linhaTopoCard}>
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
                                        <View
                                            style={[
                                                depoimentosStyle.badgeSituacao,
                                                { backgroundColor: corSituacao[avaliacao.status]?.fundo },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    depoimentosStyle.txtSituacao,
                                                    { color: corSituacao[avaliacao.status]?.texto },
                                                ]}
                                            >
                                                {avaliacao.situacao}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={depoimentosStyle.txtAvaliacao}>
                                        {avaliacao.texto}
                                    </Text>
                                    <Text style={depoimentosStyle.txtData}>
                                        Enviado em {dataParaTela(avaliacao.criado_em)}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    <Pressable
                        style={depoimentosStyle.btnVoltar}
                        onPress={() => voltar("/configuracoes")}
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
