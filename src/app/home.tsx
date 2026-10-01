import { router } from "expo-router";

import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Keyboard,
    Platform,
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
import { API_BASE_URL, buscarCategorias, Categoria } from "@/utils/categorias";

const IMAGEM_PADRAO = require("@/assets/images/img/sem-imagem.png");


type ProdutoDestaque = {
    id: number;
    slug: string;
    nome: string;
    descricao: string;
    categoria: string;
    preco: string;
    imagem: any;
    favorito: boolean;
};

type ProdutoApi = {
    id_produto: number;
    slug_produto: string;
    nome_produto: string;
    descricao_produto: string;
    valor_produto: number;
    foto_produto: string;
    destaque_produto: "SIM" | "NAO";
    categoria_produto: { nome_categoria: string };
};

// Usado enquanto a API carrega ou se a busca falhar.
const destaquesIniciais: ProdutoDestaque[] = [
    {
        id: 1,
        slug: "",
        nome: "Bolo de banana fit",
        descricao: "Banana Prata com canela e gergelim",
        categoria: "Bolos",
        preco: "R$18,00",
        imagem: require("@/assets/images/img/bolo01.png"),
        favorito: false,
    },
    {
        id: 2,
        slug: "",
        nome: "Bolo de banana fit",
        descricao: "Banana Prata com canela e gergelim",
        categoria: "Bolos",
        preco: "R$18,00",
        imagem: require("@/assets/images/img/bolo01.png"),
        favorito: false,
    },
    {
        id: 3,
        slug: "",
        nome: "Brigadeiro Gourmet",
        descricao: "Banana Prata com canela e gergelim",
        categoria: "Doces",
        preco: "R$18,00",
        imagem: require("@/assets/images/img/bolo01.png"),
        favorito: false,
    },
    {
        id: 4,
        slug: "",
        nome: "Brigadeiro Gourmet",
        descricao: "Banana Prata com canela e gergelim",
        categoria: "Doces",
        preco: "R$18,00",
        imagem: require("@/assets/images/img/bolo01.png"),
        favorito: false,
    },
];

// Usado enquanto a API carrega ou se a busca falhar.
const categoriasIniciais: Categoria[] = [
    { id: 1, nome: "Bolos", icone: require("@/assets/images/img/bolo.png") },
    { id: 2, nome: "Doces", icone: require("@/assets/images/img/brigadeiro.png") },
    { id: 3, nome: "Tortas", icone: require("@/assets/images/img/torta.png") },
    {
        id: 4,
        nome: "Bebidas",
        icone: require("@/assets/images/img/copo-de-plastico.png"),
    },
    {
        id: 5,
        nome: "Kits",
        icone: require("@/assets/images/img/presente-de-supermercado.png"),
    },
];

export default function HomeScreen() {
    const [destaques, setDestaques] = useState<ProdutoDestaque[]>(destaquesIniciais);
    const [imagensComErro, setImagensComErro] = useState<number[]>([]);
    const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciais);
    const [busca, setBusca] = useState("");

    const termoBusca = busca.trim().toLowerCase();
    const destaquesFiltrados = termoBusca
        ? destaques.filter(
              (item) =>
                  item.nome.toLowerCase().includes(termoBusca) ||
                  item.categoria.toLowerCase().includes(termoBusca)
          )
        : destaques;

    function marcarImagemComErro(id: number) {
        setImagensComErro((atual) => (atual.includes(id) ? atual : [...atual, id]));
    }

    // Carregar as categorias da API
    useEffect(() => {
        async function carregarCategorias() {
            try {
                setCategorias(await buscarCategorias());
            } catch (erro) {
                console.error("Erro ao carregar categorias:", erro);
            }
        }

        carregarCategorias();
    }, []);

    // Carregar os produtos em destaque da API
    useEffect(() => {
        async function carregarProdutos() {
            try {
                const resposta = await fetch(`${API_BASE_URL}/api/v1/produtos`);
                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status} ao buscar produtos`);
                }
                const json = await resposta.json();
                const produtosDestaque: ProdutoDestaque[] = json.data
                    .filter((produto: ProdutoApi) => produto.destaque_produto === "SIM")
                    .map((produto: ProdutoApi) => ({
                        id: produto.id_produto,
                        slug: produto.slug_produto,
                        nome: produto.nome_produto,
                        descricao: produto.descricao_produto,
                        categoria: produto.categoria_produto.nome_categoria,
                        preco: `R$${produto.valor_produto.toFixed(2).replace(".", ",")}`,
                        imagem: { uri: `${API_BASE_URL}/davilla/images/${produto.foto_produto}` },
                        favorito: false,
                    }));
                setDestaques(produtosDestaque);
            } catch (erro) {
                console.error("Erro ao carregar produtos:", erro);
            }
        }

        carregarProdutos();
    }, []);

    const scrollDestaqueRef = useRef<ScrollView>(null);
    const arrastandoRef = useRef(false);
    const posMouseInicialRef = useRef(0);
    const scrollInicialRef = useRef(0);
    const scrollAtualRef = useRef(0);

    const eventosArrasteDestaque =
        Platform.OS === "web"
            ? {
                  onMouseDown: (evento: any) => {
                      arrastandoRef.current = true;
                      posMouseInicialRef.current = evento.pageX;
                      scrollInicialRef.current = scrollAtualRef.current;
                  },
                  onMouseMove: (evento: any) => {
                      if (!arrastandoRef.current) return;
                      evento.preventDefault();
                      const delta = evento.pageX - posMouseInicialRef.current;
                      scrollDestaqueRef.current?.scrollTo({
                          x: scrollInicialRef.current - delta,
                          animated: false,
                      });
                  },
                  onMouseUp: () => {
                      arrastandoRef.current = false;
                  },
                  onMouseLeave: () => {
                      arrastandoRef.current = false;
                  },
              }
            : {};
    function alterarFavorito(id: number) {
        setDestaques((produtoFavorito) =>
            produtoFavorito.map((produto) =>
                produto.id === id
                    ? { ...produto, favorito: !produto.favorito }
                    : produto
            )
        );
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
                                    value={busca}
                                    onChangeText={setBusca}
                                    returnKeyType="search"
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                                <Pressable
                                    style={homeStyle.btnBuscar}
                                    onPress={Keyboard.dismiss}
                                >
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
                                    {categorias.map((categoria) => (
                                        <Pressable
                                            key={categoria.id}
                                            style={homeStyle.itemCategoria}
                                            onPress={() =>
                                                router.push({
                                                    pathname: "/cardapio",
                                                    params: { categoria: categoria.id },
                                                })
                                            }
                                        >
                                            <Image
                                                style={homeStyle.imgCategoria}
                                                source={categoria.icone}
                                            />
                                            <Text style={homeStyle.txtCategoria}>
                                                {categoria.nome}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            <View style={homeStyle.destaque}>
                                <Text style={homeStyle.tituloSecao}>
                                    {termoBusca ? `Resultados para "${busca}"` : " Destaque"}
                                </Text>
                                {termoBusca && destaquesFiltrados.length === 0 ? (
                                    <Text style={homeStyle.txtCategoria}>
                                        Nenhum produto em destaque encontrado.
                                    </Text>
                                ) : (
                                <ScrollView
                                    ref={scrollDestaqueRef}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={homeStyle.listaDestaque}
                                    onScroll={(evento) => {
                                        scrollAtualRef.current =
                                            evento.nativeEvent.contentOffset.x;
                                    }}
                                    scrollEventThrottle={16}
                                    style={
                                        Platform.OS === "web"
                                            ? ({ cursor: "grab" } as any)
                                            : undefined
                                    }
                                    {...eventosArrasteDestaque}
                                >
                                    {destaquesFiltrados.map((item) => (
                                        <View key={item.id} style={homeStyle.cardDestaque}>
                                            <Pressable
                                                onPress={() =>
                                                    router.push({
                                                        pathname: "/detalhesProduto",
                                                        params: { slug: item.slug },
                                                    })
                                                }
                                            >
                                                <View style={homeStyle.wrapperImgDestaque}>
                                                    <Image
                                                        style={homeStyle.imgDestaque}
                                                        source={
                                                            imagensComErro.includes(item.id)
                                                                ? IMAGEM_PADRAO
                                                                : item.imagem
                                                        }
                                                        onError={() => marcarImagemComErro(item.id)}
                                                    />
                                                    <Pressable
                                                        style={homeStyle.badgeDestaque}
                                                        onPress={() => alterarFavorito(item.id)}
                                                    >
                                                        <Text style={homeStyle.txtEstrela}>
                                                            {item.favorito ? "★" : "☆"}
                                                        </Text>
                                                    </Pressable>
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
                                </ScrollView>
                                )}
                            </View>
                        </View>

                    </ScrollView>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>


        </View>
    );
}