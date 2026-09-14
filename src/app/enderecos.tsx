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
import enderecosStyle from "@/styles/enderecosStyle";
import Footer from "@/components/footer";

const enderecos = [
    {
        id: 1,
        tipo: "Casa",
        icone: require("@/assets/images/img/home.png"),
        endereco:
            "Avenida Marechal Tito, 1500\nSão Paulo - SP\nCEP: 00000-000",
    },
    {
        id: 2,
        tipo: "Trabalho",
        icone: require("@/assets/images/img/trabalho.png"),
        endereco:
            "Avenida Marechal Tito, 1500\nSão Paulo - SP\nCEP: 00000-000",
    },
    {
        id: 3,
        tipo: "Academia",
        icone: require("@/assets/images/img/academia.png"),
        endereco:
            "Avenida Marechal Tito, 1500\nSão Paulo - SP\nCEP: 00000-000",
    },
];

export default function EnderecosScreen() {
    const [enderecoAtivoId, setEnderecoAtivoId] = useState(1);

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={enderecosStyle.header}>
                            <View style={enderecosStyle.conteudo}>
                                <Pressable
                                    style={enderecosStyle.btnVoltar}
                                    onPress={() => router.back()}
                                >
                                    <Image
                                        style={enderecosStyle.iconeVoltar}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
                                <Image
                                    style={enderecosStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={enderecosStyle.titulo}>Endereços</Text>
                            <Text style={enderecosStyle.subtitulo}>
                                Gerencie seus endereços de entrega
                            </Text>
                        </View>

                        <View style={enderecosStyle.main}>
                            {enderecos.map((endereco) => {
                                const ativo = endereco.id === enderecoAtivoId;

                                return (
                                    <View key={endereco.id} style={enderecosStyle.card}>
                                        <View style={enderecosStyle.linhaTopoCard}>
                                            <View style={enderecosStyle.linhaTipo}>
                                                <View style={enderecosStyle.iconeCaixaTipo}>
                                                    <Image
                                                        style={enderecosStyle.imgTipo}
                                                        source={endereco.icone}
                                                    />
                                                </View>
                                                <Text style={enderecosStyle.txtTipo}>
                                                    {endereco.tipo}
                                                </Text>
                                            </View>
                                            <Pressable
                                                style={enderecosStyle.btnFavorito}
                                                onPress={() => setEnderecoAtivoId(endereco.id)}
                                            >
                                                <Image
                                                    style={[
                                                        enderecosStyle.imgFavorito,
                                                        ativo && enderecosStyle.imgFavoritoAtivo,
                                                    ]}
                                                    source={require("@/assets/images/img/depoimento.png")}
                                                />
                                            </Pressable>
                                        </View>

                                        <Text style={enderecosStyle.txtEndereco}>
                                            {endereco.endereco}
                                        </Text>

                                        <View style={enderecosStyle.linhaStatus}>
                                            {ativo ? (
                                                <View style={enderecosStyle.pillAtivo}>
                                                    <Text style={enderecosStyle.txtPillAtivo}>
                                                        Endereço ativo
                                                    </Text>
                                                </View>
                                            ) : (
                                                <Pressable
                                                    onPress={() =>
                                                        setEnderecoAtivoId(endereco.id)
                                                    }
                                                >
                                                    <Text style={enderecosStyle.txtUsarEndereco}>
                                                        Usar este endereço
                                                    </Text>
                                                </Pressable>
                                            )}
                                        </View>

                                        <View style={enderecosStyle.linhaBotoes}>
                                            <Pressable style={enderecosStyle.btnEditar}>
                                                <Text style={enderecosStyle.txtEditar}>
                                                    Editar
                                                </Text>
                                            </Pressable>
                                            <Pressable style={enderecosStyle.btnExcluir}>
                                                <Text style={enderecosStyle.txtExcluir}>
                                                    Excluir
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                );
                            })}

                            <Pressable style={enderecosStyle.btnAdicionar}>
                                <Text style={enderecosStyle.txtAdicionar}>
                                    + Adicionar novo endereço
                                </Text>
                            </Pressable>

                            <Pressable
                                style={enderecosStyle.btnCancelar}
                                onPress={() => router.back()}
                            >
                                <Text style={enderecosStyle.txtCancelar}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
