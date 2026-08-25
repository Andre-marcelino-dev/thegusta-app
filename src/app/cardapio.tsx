import { router } from "expo-router";
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
import cardapioStyle from "@/styles/cardapioStyle";

import { cores } from "@/styles/variaveis";

const categorias = [
    {
        id: 1,
        nome: "Bolos",
        icone: require("@/assets/images/img/bolo.png"),
    },
    {
        id: 2,
        nome: "Doces",
        icone: require("@/assets/images/img/brigadeiro.png"),
    },
    {
        id: 3,
        nome: "Tortas",
        icone: require("@/assets/images/img/torta.png"),
    },
    {
        id: 4,
        nome: "Bebidas",
        icone: require("@/assets/images/img/copo-de-plastico.png"),
    },
    {
        id: 5,
        nome: "Presentes",
        icone: require("@/assets/images/img/presente-de-supermercado.png"),
    },
];

const cardapio = [
    {
        id: 1,
        categoria: "Bolos",
        produtos: [
            {
                id: 1,
                nome: "Bolo de banana fit",
                descricao: "Banana Prata com canela e gergelim",
                preco: "R$18,00",
                imagem: require("@/assets/images/img/bolo01.png"),
            },
            {
                id: 2,
                nome: "Bolo de banana fit",
                descricao: "Banana Prata com canela e gergelim",
                preco: "R$18,00",
                imagem: require("@/assets/images/img/bolo01.png"),
            },
            {
                id: 3,
                nome: "Bolo de banana fit",
                descricao: "Banana Prata com canela e gergelim",
                preco: "R$18,00",
                imagem: require("@/assets/images/img/bolo01.png"),
            },
            {
                id: 4,
                nome: "Bolo de banana fit",
                descricao: "Banana Prata com canela e gergelim",
                preco: "R$18,00",
                imagem: require("@/assets/images/img/bolo01.png"),
            },
        ],
    },
    {
        id: 2,
        categoria: "Doces",
        produtos: [
            {
                id: 5,
                nome: "Bolo de banana fit",
                descricao: "Banana Prata com canela e gergelim",
                preco: "R$18,00",
                imagem: require("@/assets/images/img/bolo01.png"),
            },
            {
                id: 6,
                nome: "Bolo de banana fit",
                descricao: "Banana Prata com canela e gergelim",
                preco: "R$18,00",
                imagem: require("@/assets/images/img/bolo01.png"),
            },
        ],
    },
];

const menuItens = [
    {
        id: 1,
        rotulo: "Home",
        icone: require("@/assets/images/img/home.png"),
        rota: "/home",
        ativo: false,
    },
    {
        id: 2,
        rotulo: "Cardápio",
        icone: require("@/assets/images/img/cardapio.png"),
        rota: "/cardapio",
        ativo: true,
    },
    {
        id: 3,
        rotulo: "Sacola",
        icone: require("@/assets/images/img/sacola.png"),
        rota: "/sacola",
        ativo: false,
    },
    {
        id: 4,
        rotulo: "Pedido",
        icone: require("@/assets/images/img/pedido.png"),
        rota: null,
        ativo: false,
    },
    {
        id: 5,
        rotulo: "Config",
        icone: require("@/assets/images/img/config.png"),
        rota: null,
        ativo: false,
    },
];

export default function CardapioScreen() {
    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={cardapioStyle.header}>
                            <View style={cardapioStyle.conteudo}>
                                <Pressable onPress={() => router.back()}>
                                    <Image
                                        style={cardapioStyle.iconeVoltar}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
                                <Image
                                    style={cardapioStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={cardapioStyle.titulo}>Cardápio</Text>
                            <Text style={cardapioStyle.subtitulo}>
                                Escolha suas delicias saudáveis
                            </Text>
                        </View>
                        <View style={cardapioStyle.main}>

                            <View style={cardapioStyle.buscaPoduto}>
                                <TextInput style={cardapioStyle.txtProduto}
                                    placeholder="Buscar produto"
                                    placeholderTextColor={cores.cinzclaro}
                                />
                                <Pressable style={cardapioStyle.btnBuscar}>
                                    <Image
                                        style={cardapioStyle.imgBuscar}
                                        source={require("@/assets/images/img/lupa.png")}
                                    />
                                </Pressable>
                            </View>

                            <View style={cardapioStyle.categoria}>
                                <View style={cardapioStyle.conteudoCategoria}>
                                    {categorias.map((item) => (
                                        <View key={item.id} style={cardapioStyle.itemCategoria}>
                                            <View style={cardapioStyle.caixaCategoria}>
                                                <Image
                                                    style={cardapioStyle.imgCategoria}
                                                    source={item.icone}
                                                />
                                            </View>
                                            <Text style={cardapioStyle.txtCategoria}>
                                                {item.nome}
                                            </Text>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            {cardapio.map((secao) => (
                                <View key={secao.id} style={cardapioStyle.destaque}>
                                    <Text style={cardapioStyle.tituloSecao}>
                                        {secao.categoria}
                                    </Text>
                                    <View style={cardapioStyle.listaDestaque}>
                                        {secao.produtos.map((item) => (
                                            <Pressable
                                                key={item.id}
                                                style={cardapioStyle.cardDestaque}
                                                onPress={() => router.push("/detalhesProduto")}
                                            >
                                                <Image
                                                    style={cardapioStyle.imgDestaque}
                                                    source={item.imagem}
                                                />
                                                <Text style={cardapioStyle.nomeDestaque} numberOfLines={2}>
                                                    {item.nome}
                                                </Text>
                                                <Text style={cardapioStyle.descricaoDestaque} numberOfLines={2}>
                                                    {item.descricao}
                                                </Text>
                                                <View style={cardapioStyle.rodapeDestaque}>
                                                    <Text style={cardapioStyle.precoDestaque}>
                                                        {item.preco}
                                                    </Text>
                                                    <Pressable style={cardapioStyle.btnAdicionar}>
                                                        <Image
                                                            style={cardapioStyle.imgAdicionar}
                                                            source={require("@/assets/images/img/mais.png")}
                                                        />
                                                    </Pressable>
                                                </View>
                                            </Pressable>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>

                    </ScrollView>

                    <View style={cardapioStyle.menuInferior}>
                        {menuItens.map((item) => (
                            <Pressable
                                key={item.id}
                                style={cardapioStyle.itemMenu}
                                onPress={() => item.rota && router.push(item.rota as any)}
                            >
                                <Image
                                    style={[cardapioStyle.imgMenu, { tintColor: cores.laranja }]}
                                    source={item.icone}
                                />
                                <Text style={cardapioStyle.txtMenu}>
                                    {item.rotulo}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
