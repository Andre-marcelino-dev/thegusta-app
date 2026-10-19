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
import enderecosStyle from "@/styles/enderecosStyle";
import Footer from "@/components/footer";
import { voltar } from "@/utils/navegacao";
import {
    buscarEnderecos,
    Endereco,
    excluirEndereco,
    formatarEndereco,
    tornarPrincipal,
} from "@/utils/enderecos";

// Ícone do card pelo nome que o cliente deu ao endereço
function iconeDoEndereco(nome: string) {
    const valor = nome.toLowerCase();
    if (valor.includes("trabalho") || valor.includes("escrit"))
        return require("@/assets/images/img/trabalho.png");
    if (valor.includes("academia")) return require("@/assets/images/img/academia.png");
    if (valor.includes("casa")) return require("@/assets/images/img/home.png");
    return require("@/assets/images/img/local.png");
}

export default function EnderecosScreen() {
    const [enderecos, setEnderecos] = useState<Endereco[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    async function carregarEnderecos() {
        try {
            setEnderecos(await buscarEnderecos());
        } catch (e) {
            console.error("Erro ao carregar endereços:", e);
            setErro("Não foi possível carregar seus endereços.");
        } finally {
            setCarregando(false);
        }
    }

    // Recarrega toda vez que a tela aparece (ex.: ao voltar da edição)
    useFocusEffect(useCallback(() => {
        carregarEnderecos();
    }, []));

    async function usarEndereco(id: number) {
        setErro("");
        try {
            await tornarPrincipal(id);
            await carregarEnderecos();
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível trocar o endereço.");
        }
    }

    async function excluir(id: number) {
        setErro("");
        try {
            await excluirEndereco(id);
            await carregarEnderecos();
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível excluir o endereço.");
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
                        <View style={enderecosStyle.header}>
                            <View style={enderecosStyle.conteudo}>
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
                            {!carregando && enderecos.length === 0 && (
                                <Text style={enderecosStyle.txtEndereco}>
                                    Você ainda não cadastrou nenhum endereço. Toque em
                                    "Adicionar novo endereço".
                                </Text>
                            )}

                            {enderecos.map((endereco) => {
                                const ativo = endereco.principal_endereco === "SIM";

                                return (
                                    <View key={endereco.id_endereco} style={enderecosStyle.card}>
                                        <View style={enderecosStyle.linhaTopoCard}>
                                            <View style={enderecosStyle.linhaTipo}>
                                                <View style={enderecosStyle.iconeCaixaTipo}>
                                                    <Image
                                                        style={enderecosStyle.imgTipo}
                                                        source={iconeDoEndereco(endereco.nome_endereco)}
                                                    />
                                                </View>
                                                <Text style={enderecosStyle.txtTipo}>
                                                    {endereco.nome_endereco}
                                                </Text>
                                            </View>
                                            <Pressable
                                                style={enderecosStyle.btnFavorito}
                                                onPress={() => usarEndereco(endereco.id_endereco)}
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
                                            {formatarEndereco(endereco)}
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
                                                        usarEndereco(endereco.id_endereco)
                                                    }
                                                >
                                                    <Text style={enderecosStyle.txtUsarEndereco}>
                                                        Usar este endereço
                                                    </Text>
                                                </Pressable>
                                            )}
                                        </View>

                                        <View style={enderecosStyle.linhaBotoes}>
                                            <Pressable
                                                style={enderecosStyle.btnEditar}
                                                onPress={() =>
                                                    router.push({
                                                        pathname: "/editarEndereco",
                                                        params: { id: endereco.id_endereco },
                                                    })
                                                }
                                            >
                                                <Text style={enderecosStyle.txtEditar}>
                                                    Editar
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                style={enderecosStyle.btnExcluir}
                                                onPress={() => excluir(endereco.id_endereco)}
                                            >
                                                <Text style={enderecosStyle.txtExcluir}>
                                                    Excluir
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                );
                            })}

                            {erro !== "" && (
                                <Text style={enderecosStyle.txtErro}>{erro}</Text>
                            )}

                            <Pressable
                                style={enderecosStyle.btnAdicionar}
                                onPress={() => router.push("/editarEndereco")}
                            >
                                <Text style={enderecosStyle.txtAdicionar}>
                                    + Adicionar novo endereço
                                </Text>
                            </Pressable>

                            <Pressable
                                style={enderecosStyle.btnCancelar}
                                onPress={() => voltar("/configuracoes")}
                            >
                                <Text style={enderecosStyle.txtCancelar}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={enderecosStyle.btnVoltar}
                        onPress={() => voltar("/configuracoes")}
                    >
                        <Image
                            style={enderecosStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
