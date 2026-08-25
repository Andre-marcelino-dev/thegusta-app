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
import LinkSenhaModal from "@/components/linkSenhaModal";
import redefinirSenhaStyle from "@/styles/redefinirSenhaStyle";

export default function RedefinirSenhaScreen() {
 const [verSenha, setVerSenha] = useState(false);
  const [verConfirmarSenha, setVerConfirmarSenha] = useState(false);

  return (
    <View style={globalStyle.container}>
      <ImageBackground
        source={require("@/assets/images/img/00_fundo.png")}
        style={globalStyle.background}
        resizeMode="cover"
      >
        <SafeAreaView style={globalStyle.areaConteudo}>
          <ScrollView style={globalStyle.scrollConteudo}>
            <View style={redefinirSenhaStyle.conteudo}>
              <Image
                source={require("@/assets/images/img/logo.png")}
                style={globalStyle.logoMaior}
              />
              <Text style={redefinirSenhaStyle.titulo}>
                Redefinir senha
              </Text>
              <Text style={redefinirSenhaStyle.subtitulo}>
              Crie uma nova senha para acessar
                     sua conta
              </Text>

              <View style={redefinirSenhaStyle.form}>
                <View style={redefinirSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/img/senha.png")}
                    style={redefinirSenhaStyle.icone}
                  />
                  <TextInput
                    placeholder="Senha"
                    placeholderTextColor="#888888"
                    style={redefinirSenhaStyle.TextInput}
                    secureTextEntry={!verSenha}
                  />

                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verSenha
                          ? require("@/assets/images/img/esconder.png")
                          : require("@/assets/images/img/mostrar.png")
                      }
                      style={redefinirSenhaStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>

                <View style={redefinirSenhaStyle.input}>
                  <Image
                    source={require("@/assets/images/img/senha.png")}
                    style={redefinirSenhaStyle.icone}
                  />
                  <TextInput
                    placeholder="Confirmar Senha"
                    placeholderTextColor="#888888"
                    style={redefinirSenhaStyle.TextInput}
                    secureTextEntry={!verConfirmarSenha}
                  />

                  <Pressable
                    style={redefinirSenhaStyle.btnMostrarSenha}
                    onPress={() => setVerConfirmarSenha((current) => !current)}
                  >
                    <Image
                      source={
                        verConfirmarSenha
                          ? require("@/assets/images/img/esconder.png")
                          : require("@/assets/images/img/mostrar.png")
                      }
                      style={redefinirSenhaStyle.mostrarSenha}
                    />
                  </Pressable>
                </View>


                <Pressable
                  style={({ pressed }) => [
                    redefinirSenhaStyle.btnSalvar,
                    pressed && redefinirSenhaStyle.btnSalvarPressed,
                  ]}
               
                >
                  <Text style={redefinirSenhaStyle.txtVoltar}>Salvar senha</Text>
                </Pressable>

                <Pressable
                  style={({ pressed }) => [
                    redefinirSenhaStyle.btnVoltar,
                    pressed && redefinirSenhaStyle.btnVoltarPressed,
                  ]}
                  onPress={() => router.navigate("/")}
                >
                  <Text style={redefinirSenhaStyle.txtVoltar}>
                    Voltar ao login
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>

        
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}
