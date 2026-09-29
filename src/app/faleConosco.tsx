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
import faleConoscoStyle from "@/styles/faleConoscoStyle";
import Footer from "@/components/footer";
import { cores } from "@/styles/variaveis";

export default function FaleConoscoScreen() {
    const [assunto, setAssunto] = useState("");
    const [mensagem, setMensagem] = useState("");

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={faleConoscoStyle.header}>
                            <View style={faleConoscoStyle.conteudo}>
                                <Image
                                    style={faleConoscoStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={faleConoscoStyle.titulo}>Fale Conosco</Text>
                            <Text style={faleConoscoStyle.subtitulo}>
                                Envie sua mensagem para o The Gusta
                            </Text>
                        </View>

                        <View style={faleConoscoStyle.main}>
                            <View style={faleConoscoStyle.campo}>
                                <Image
                                    style={faleConoscoStyle.iconeCampo}
                                    source={require("@/assets/images/img/assunto.png")}
                                />
                                <TextInput
                                    style={faleConoscoStyle.inputCampo}
                                    placeholder="Assunto"
                                    placeholderTextColor={cores.cinzclaro}
                                    value={assunto}
                                    onChangeText={setAssunto}
                                />
                            </View>

                            <View style={faleConoscoStyle.campoMensagem}>
                                <Image
                                    style={faleConoscoStyle.iconeMensagem}
                                    source={require("@/assets/images/img/mensagem.png")}
                                />
                                <TextInput
                                    style={faleConoscoStyle.inputMensagem}
                                    placeholder="Mensagem"
                                    placeholderTextColor={cores.cinzclaro}
                                    multiline
                                    numberOfLines={6}
                                    value={mensagem}
                                    onChangeText={setMensagem}
                                />
                            </View>

                            <Pressable style={faleConoscoStyle.btnEnviar}>
                                <Text style={faleConoscoStyle.txtEnviar}>
                                    Enviar mensagem
                                </Text>
                            </Pressable>

                            <View style={faleConoscoStyle.cardAtendimento}>
                                <View style={faleConoscoStyle.infoAtendimento}>
                                    <Text style={faleConoscoStyle.tituloAtendimento}>
                                        Atendimento
                                    </Text>
                                    <Text style={faleConoscoStyle.txtValor}>
                                        (11)99999-9999
                                    </Text>
                                    <Text style={faleConoscoStyle.txtLabel}>E-mail</Text>
                                    <Text style={faleConoscoStyle.txtValor}>
                                        contato@thegusta.com.br
                                    </Text>
                                    <Text style={faleConoscoStyle.txtLabel}>
                                        Horário de atendimento
                                    </Text>
                                    <Text style={faleConoscoStyle.txtValor}>
                                        Seg à Sáb, das 9h às 18h
                                    </Text>
                                </View>
                                <View style={faleConoscoStyle.iconeCaixaAtendimento}>
                                    <Image
                                        style={faleConoscoStyle.imgIconeAtendimento}
                                        source={require("@/assets/images/img/mensagem.png")}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={faleConoscoStyle.btnVoltar}
                        onPress={() => router.back()}
                    >
                        <Image
                            style={faleConoscoStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
