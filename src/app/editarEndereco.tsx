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
import editarEnderecoStyle from "@/styles/editarEnderecoStyle";
import Footer from "@/components/footer";
import { cores } from "@/styles/variaveis";

export default function EditarEnderecoScreen() {
    const [nomeEndereco, setNomeEndereco] = useState("Casa");
    const [endereco, setEndereco] = useState("Avenida Marechal Tito, 1500");
    const [bairro, setBairro] = useState("São Miguel Paulista");
    const [cidade, setCidade] = useState("São Paulo");
    const [uf, setUf] = useState("SP");
    const [cep, setCep] = useState("");

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={editarEnderecoStyle.header}>
                            <View style={editarEnderecoStyle.conteudo}>
                                <Image
                                    style={editarEnderecoStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={editarEnderecoStyle.titulo}>
                                Editar endereço
                            </Text>
                            <Text style={editarEnderecoStyle.subtitulo}>
                                Edite o endereço selecionado
                            </Text>
                        </View>

                        <View style={editarEnderecoStyle.main}>
                            <View style={editarEnderecoStyle.form}>
                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Nome do endereço
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="Casa"
                                        placeholderTextColor={cores.cinzclaro}
                                        value={nomeEndereco}
                                        onChangeText={setNomeEndereco}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Endereço
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="Avenida Marechal Tito, 1500"
                                        placeholderTextColor={cores.cinzclaro}
                                        value={endereco}
                                        onChangeText={setEndereco}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Bairro
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="São Miguel Paulista"
                                        placeholderTextColor={cores.cinzclaro}
                                        value={bairro}
                                        onChangeText={setBairro}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Cidade
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="São Paulo"
                                        placeholderTextColor={cores.cinzclaro}
                                        value={cidade}
                                        onChangeText={setCidade}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            UF
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="SP"
                                        placeholderTextColor={cores.cinzclaro}
                                        autoCapitalize="characters"
                                        maxLength={2}
                                        value={uf}
                                        onChangeText={setUf}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            CEP
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="00000-000"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="numeric"
                                        maxLength={9}
                                        value={cep}
                                        onChangeText={setCep}
                                    />
                                </View>
                            </View>

                            <Pressable style={editarEnderecoStyle.btnSalvar}>
                                <Text style={editarEnderecoStyle.txtSalvar}>
                                    Salvar alterações
                                </Text>
                            </Pressable>

                            <Pressable
                                style={editarEnderecoStyle.btnCancelar}
                                onPress={() => router.back()}
                            >
                                <Text style={editarEnderecoStyle.txtCancelar}>
                                    Cancelar
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={editarEnderecoStyle.btnVoltar}
                        onPress={() => router.back()}
                    >
                        <Image
                            style={editarEnderecoStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
