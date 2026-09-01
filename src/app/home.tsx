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
import homeStyle from "@/styles/homeStyle";
import Footer from "@/components/footer";

import { cores } from "@/styles/variaveis";

const destaques = [
    {
        id: 1,
        nome: "Bolo de banana fit",
        descricao: "Banana Prata com canela e gergelim",
        preco: "R$18,00",
        imagem: require("@/assets/images/img/bolo01.png"),
        destaque: true,
    },
    {
        id: 2,
        nome: "Bolo de banana fit",
        descricao: "Banana Prata com canela e gergelim",
        preco: "R$18,00",
        imagem: require("@/assets/images/img/bolo01.png"),
        destaque: false,
    },
    {
        id: 3,
        nome: "Bolo de banana fit",
        descricao: "Banana Prata com canela e gergelim",
        preco: "R$18,00",
        imagem: require("@/assets/images/img/bolo01.png"),
        destaque: false,
    },
];

export default function HomeScreen() {
    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={homeStyle.header}>


                            <View style={homeStyle.conteudo}>
                                <Text style={homeStyle.titulo}> Óla, Cliente</Text>
                                <View style={homeStyle.bordaPerfil}>
                                    <Image
                                        style={homeStyle.perfil}
                                        source={require("@/assets/images/img/user.png")}
                                    />
                                </View>


                            </View>
                            <Text style={homeStyle.subtitulo}>
                                O que vai adoçar seu dia hoje?
                            </Text>
                        </View>
                        <View style={homeStyle.main}>

                            <View style={homeStyle.buscaPoduto}>
                                <TextInput style={homeStyle.txtProduto}
                                    placeholder="Buscar produto"
                                    placeholderTextColor={cores.cinzclaro}

                                />
                                <Pressable style={homeStyle.btnBuscar}>
                                    <Image
                                        style={homeStyle.imgBuscar}
                                        source={require("@/assets/images/img/lupa.png")}
                                    />
                                </Pressable>
                            </View>

                            <Image
                                style={homeStyle.banner}
                                source={require("@/assets/images/img/banner.png")}
                                resizeMode="stretch"
                            />


                            <View style={homeStyle.categoria}>
                                <Text style={homeStyle.tituloSecao}>
                                    Categorias
                                </Text>
                                <View style={homeStyle.conteudoCategoria}>
                                    <View style={homeStyle.itemCategoria}>
                                        <Image style={homeStyle.imgCategoria}
                                            source={require('@/assets/images/img/bolo.png')}
                                        />
                                        <Text style={homeStyle.txtCategoria}>Bolos</Text>
                                    </View>
                                    <View style={homeStyle.itemCategoria}>
                                        <Image style={homeStyle.imgCategoria}
                                            source={require('@/assets/images/img/brigadeiro.png')}
                                        />
                                        <Text style={homeStyle.txtCategoria}>Doces</Text>
                                    </View>
                                    <View style={homeStyle.itemCategoria}>
                                        <Image style={homeStyle.imgCategoria}
                                            source={require('@/assets/images/img/torta.png')}
                                        />
                                        <Text style={homeStyle.txtCategoria}>Tortas</Text>
                                    </View>
                                    <View style={homeStyle.itemCategoria}>
                                        <Image style={homeStyle.imgCategoria}
                                            source={require('@/assets/images/img/copo-de-plastico.png')}
                                        />
                                        <Text style={homeStyle.txtCategoria}>Bebidas</Text>
                                    </View>
                                    <View style={homeStyle.itemCategoria}>
                                        <Image style={homeStyle.imgCategoria}
                                            source={require('@/assets/images/img/presente-de-supermercado.png')}
                                        />
                                        <Text style={homeStyle.txtCategoria}>Kits</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={homeStyle.destaque}>
                                <Text style={homeStyle.tituloSecao}> Destaque</Text>
                                <View style={homeStyle.listaDestaque}>
                                    {destaques.map((item) => (
                                        <View key={item.id} style={homeStyle.cardDestaque}>
                                            <Pressable
                                                onPress={() => router.push("/detalhesProduto")}
                                            >
                                                <View style={homeStyle.wrapperImgDestaque}>
                                                    <Image
                                                        style={homeStyle.imgDestaque}
                                                        source={item.imagem}
                                                    />
                                                    <View style={homeStyle.badgeDestaque}>
                                                        <Text style={homeStyle.txtEstrela}>
                                                            {item.destaque ? "★" : "☆"}
                                                        </Text>
                                                    </View>
                                                </View>
                                                <Text style={homeStyle.nomeDestaque} numberOfLines={2}>
                                                    {item.nome}
                                                </Text>
                                                <Text style={homeStyle.descricaoDestaque} numberOfLines={2}>
                                                    {item.descricao}
                                                </Text>
                                            </Pressable>
                                            <View style={homeStyle.rodapeDestaque}>
                                                <Text style={homeStyle.precoDestaque}>
                                                    {item.preco}
                                                </Text>
                                                <Pressable style={homeStyle.btnAdicionar}>
                                                    <Image
                                                        style={homeStyle.imgAdicionar}
                                                        source={require("@/assets/images/img/mais.png")}
                                                    />
                                                </Pressable>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        </View>

                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>


        </View>
    );
}