

import { router } from "expo-router";
import { useState } from "react";

import {
  Image,
  ImageBackground,
  Pressable,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";

import LoginStyle from "@/styles/loginStyle";
import globalStyle from "@/styles/globalStyle";
import { SafeAreaView } from "react-native-safe-area-context";
import { fazerLogin } from "@/utils/auth";

export default function LoginScreen() {
  const [verSenha, setVerSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    const emailLimpo = email.trim();
    if (!emailLimpo || !senha) {
      setErro("Preencha o e-mail e a senha.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(emailLimpo)) {
      setErro("Informe um e-mail válido.");
      return;
    }

    setErro("");
    setCarregando(true);
    try {
      await fazerLogin(emailLimpo, senha);
      router.replace("/home");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível fazer login.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/00_fundo.png")}
        style={globalStyle.background}
        resizeMode="cover"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={LoginStyle.conteudo}>
              <Image
                source={require("@/assets/images/img/logo.png")}
                style={globalStyle.logoMaior}
              />
              <Text style={LoginStyle.titulo}>Bem-vindo(a)!</Text>
              <Text style={LoginStyle.subtitulo}>
                Faça seu login para continuar
              </Text>

              {/* Formulario de login */}
              <View style={LoginStyle.form}>
                <View style={LoginStyle.input}>
                  <Image
                    source={require("@/assets/images/img/email.png")}
                    style={LoginStyle.icone}
                  />

                  <TextInput
                    placeholder="E-mail"
                    placeholderTextColor="#888888"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={LoginStyle.TextInput}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={LoginStyle.input}>
                  <Image
                    source={require("@/assets/images/img/senha.png")}
                    style={LoginStyle.icone}
                  />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#888888"
                    style={LoginStyle.TextInput}
                    secureTextEntry={!verSenha}
                    value={senha}
                    onChangeText={setSenha}
                    returnKeyType="go"
                    onSubmitEditing={entrar}
                  />

                  <Pressable
                    style={LoginStyle.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                          ? require("@/assets/images/img/esconder.png")
                          : require("@/assets/images/img/mostrar.png")
                      }
                      style={LoginStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>

                <Pressable
                  style={LoginStyle.btnEsqueciSenha}
                  onPress={() => router.navigate("/esqueci-senha")}
                >
                  <Text style={LoginStyle.txtEsqueciSenha}>
                    Esqueci minha senha
                  </Text>
                </Pressable>

                {erro !== "" && <Text style={LoginStyle.txtErro}>{erro}</Text>}

                <Pressable
                  style={({ pressed }) => [
                    LoginStyle.btnEntrar,
                    pressed && LoginStyle.btnEntrarPressed,
                    carregando && { opacity: 0.6 },
                  ]}
                  onPress={entrar}
                  disabled={carregando}
                >
                  <Text style={LoginStyle.txtEntrar}>
                    {carregando ? "Entrando..." : "Entrar"}
                  </Text>
                </Pressable>

                <View style={LoginStyle.Separador}>
                  <View style={LoginStyle.linha}></View>
                  <Text style={LoginStyle.textoSeparador}>OU</Text>
                  <View style={LoginStyle.linha}></View>
                </View>

                <Pressable
                  style={({ pressed }) => [
                    LoginStyle.btnCriarConta,
                    pressed && LoginStyle.btnCriarContaPressed,
                  ]}
                  onPress={() => router.navigate("/cad-cliente")}
                >
                  <Text style={LoginStyle.txtCriarConta}>Criar Conta</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
