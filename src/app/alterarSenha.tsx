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
import alterarSenhaStyle from "@/styles/alterarSenhaStyle";
import Footer from "@/components/footer";
import { cores } from "@/styles/variaveis";

export default function AlterarSenhaScreen() {
    const [senhaAtual, setSenhaAtual] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [verSenhaAtual, setVerSenhaAtual] = useState(false);
    const [verNovaSenha, setVerNovaSenha] = useState(false);
    const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={alterarSenhaStyle.header}>
                            <View style={alterarSenhaStyle.conteudo}>
                                <Image
                                    style={alterarSenhaStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={alterarSenhaStyle.titulo}>Alterar senha</Text>
                            <Text style={alterarSenhaStyle.subtitulo}>
                                Atualize sua senha com segurança
                            </Text>
                        </View>

                        <View style={alterarSenhaStyle.main}>
                            <View style={alterarSenhaStyle.form}>
                                <View style={alterarSenhaStyle.campo}>
                                    <Image
                                        style={alterarSenhaStyle.iconeCampo}
                                        source={require("@/assets/images/img/senha.png")}
                                    />
                                    <TextInput
                                        style={alterarSenhaStyle.inputCampo}
                                        placeholder="Senha"
                                        placeholderTextColor={cores.cinzclaro}
                                        secureTextEntry={!verSenhaAtual}
                                        value={senhaAtual}
                                        onChangeText={setSenhaAtual}
                                    />
                                    <Pressable
                                        style={alterarSenhaStyle.btnMostrarSenha}
                                        onPress={() =>
                                            setVerSenhaAtual((valor) => !valor)
                                        }
                                    >
                                        <Image
                                            style={alterarSenhaStyle.imgMostrarSenha}
                                            source={
                                                verSenhaAtual
                                                    ? require("@/assets/images/img/esconder.png")
                                                    : require("@/assets/images/img/mostrar.png")
                                            }
                                        />
                                    </Pressable>
                                </View>

                                <View style={alterarSenhaStyle.campo}>
                                    <Image
                                        style={alterarSenhaStyle.iconeCampo}
                                        source={require("@/assets/images/img/senha.png")}
                                    />
                                    <TextInput
                                        style={alterarSenhaStyle.inputCampo}
                                        placeholder="Senha"
                                        placeholderTextColor={cores.cinzclaro}
                                        secureTextEntry={!verNovaSenha}
                                        value={novaSenha}
                                        onChangeText={setNovaSenha}
                                    />
                                    <Pressable
                                        style={alterarSenhaStyle.btnMostrarSenha}
                                        onPress={() =>
                                            setVerNovaSenha((valor) => !valor)
                                        }
                                    >
                                        <Image
                                            style={alterarSenhaStyle.imgMostrarSenha}
                                            source={
                                                verNovaSenha
                                                    ? require("@/assets/images/img/esconder.png")
                                                    : require("@/assets/images/img/mostrar.png")
                                            }
                                        />
                                    </Pressable>
                                </View>

                                <View style={alterarSenhaStyle.campo}>
                                    <Image
                                        style={alterarSenhaStyle.iconeCampo}
                                        source={require("@/assets/images/img/senha.png")}
                                    />
                                    <TextInput
                                        style={alterarSenhaStyle.inputCampo}
                                        placeholder="Senha"
                                        placeholderTextColor={cores.cinzclaro}
                                        secureTextEntry={!verConfirmarSenha}
                                        value={confirmarSenha}
                                        onChangeText={setConfirmarSenha}
                                    />
                                    <Pressable
                                        style={alterarSenhaStyle.btnMostrarSenha}
                                        onPress={() =>
                                            setVerConfirmarSenha((valor) => !valor)
                                        }
                                    >
                                        <Image
                                            style={alterarSenhaStyle.imgMostrarSenha}
                                            source={
                                                verConfirmarSenha
                                                    ? require("@/assets/images/img/esconder.png")
                                                    : require("@/assets/images/img/mostrar.png")
                                            }
                                        />
                                    </Pressable>
                                </View>
                            </View>

                            <View style={alterarSenhaStyle.cardDicas}>
                                <View style={alterarSenhaStyle.iconeCaixaDicas}>
                                    <Image
                                        style={alterarSenhaStyle.imgIconeDicas}
                                        source={require("@/assets/images/img/info.png")}
                                    />
                                </View>
                                <View style={alterarSenhaStyle.infoDicas}>
                                    <Text style={alterarSenhaStyle.tituloDicas}>
                                        Dicas para uma senha segura
                                    </Text>
                                    <Text style={alterarSenhaStyle.itemDica}>
                                        • Use pelo menos 8 caracteres
                                    </Text>
                                    <Text style={alterarSenhaStyle.itemDica}>
                                        • Contenha letras e números
                                    </Text>
                                </View>
                            </View>

                            <Pressable style={alterarSenhaStyle.btnSalvar}>
                                <Text style={alterarSenhaStyle.txtSalvar}>
                                    Salvar nova senha
                                </Text>
                            </Pressable>

                            <Pressable
                                style={alterarSenhaStyle.btnCancelar}
                                onPress={() => router.back()}
                            >
                                <Text style={alterarSenhaStyle.txtCancelar}>
                                    Cancelar
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={alterarSenhaStyle.btnVoltar}
                        onPress={() => router.back()}
                    >
                        <Image
                            style={alterarSenhaStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
