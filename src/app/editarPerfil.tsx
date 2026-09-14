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
import editarPerfilStyle from "@/styles/editarPerfilStyle";
import Footer from "@/components/footer";
import { cores } from "@/styles/variaveis";

export default function EditarPerfilScreen() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [receberNovidades, setReceberNovidades] = useState(true);

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={editarPerfilStyle.header}>
                            <View style={editarPerfilStyle.conteudo}>
                                <Pressable
                                    style={editarPerfilStyle.btnVoltar}
                                    onPress={() => router.back()}
                                >
                                    <Image
                                        style={editarPerfilStyle.iconeVoltar}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
                                <Image
                                    style={editarPerfilStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={editarPerfilStyle.titulo}>Editar perfil</Text>
                            <Text style={editarPerfilStyle.subtitulo}>
                                Atualize seus dados pessoais
                            </Text>
                        </View>

                        <View style={editarPerfilStyle.main}>
                            <View style={editarPerfilStyle.cardFoto}>
                                <View style={editarPerfilStyle.linhaFoto}>
                                    <View style={editarPerfilStyle.avatarFoto}>
                                        <Image
                                            style={editarPerfilStyle.imgAvatarFoto}
                                            source={require("@/assets/images/img/perfil.png")}
                                        />
                                    </View>
                                    <Pressable style={editarPerfilStyle.btnAlterarFoto}>
                                        <Text style={editarPerfilStyle.txtAlterarFoto}>
                                            Alterar foto
                                        </Text>
                                    </Pressable>
                                </View>
                                <Text style={editarPerfilStyle.txtDescricaoFoto}>
                                    A foto do perfil ajuda a personalizar e identificar sua
                                    conta
                                </Text>
                            </View>

                            <View style={editarPerfilStyle.form}>
                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/user.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="Seu nome completo aqui"
                                        placeholderTextColor={cores.cinzclaro}
                                        value={nome}
                                        onChangeText={setNome}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/email.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="seuemail@exemplo.com"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/telefone.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="(11) 99999-99999"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="phone-pad"
                                        value={telefone}
                                        onChangeText={setTelefone}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/documento.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="000.000.000-00"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="numeric"
                                        value={cpf}
                                        onChangeText={setCpf}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/calendario.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="dd/mm/aaaa"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="numeric"
                                        value={nascimento}
                                        onChangeText={setNascimento}
                                    />
                                </View>
                            </View>

                            <View style={editarPerfilStyle.cardNotificacao}>
                                <View style={editarPerfilStyle.iconeCaixaNotificacao}>
                                    <Image
                                        style={editarPerfilStyle.imgIconeNotificacao}
                                        source={require("@/assets/images/img/notificacao.png")}
                                    />
                                </View>
                                <View style={editarPerfilStyle.infoNotificacao}>
                                    <Text style={editarPerfilStyle.tituloNotificacao}>
                                        Receber novidades e promoções
                                    </Text>
                                    <Text style={editarPerfilStyle.descricaoNotificacao}>
                                        Fique por dentro das nossas ofertas e sugestões
                                    </Text>
                                </View>
                                <Pressable
                                    onPress={() =>
                                        setReceberNovidades((valor) => !valor)
                                    }
                                >
                                    <Image
                                        style={editarPerfilStyle.imgToggle}
                                        source={
                                            receberNovidades
                                                ? require("@/assets/images/img/ativo.png")
                                                : require("@/assets/images/img/inativo.png")
                                        }
                                    />
                                </Pressable>
                            </View>

                            <Pressable style={editarPerfilStyle.btnSalvar}>
                                <Text style={editarPerfilStyle.txtSalvar}>
                                    Salvar alterações
                                </Text>
                            </Pressable>

                            <Pressable
                                style={editarPerfilStyle.btnCancelar}
                                onPress={() => router.back()}
                            >
                                <Text style={editarPerfilStyle.txtCancelar}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
