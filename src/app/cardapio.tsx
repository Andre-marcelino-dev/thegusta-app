import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Keyboard,
    Pressable,
    Text,
    TextInput,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import cardapioStyle from "@/styles/cardapioStyle";
import Footer from "@/components/footer";

import { cores } from "@/styles/variaveis";
import { API_BASE_URL, buscarCategorias, Categoria } from "@/utils/categorias";

// Usado enquanto a API carrega ou se a busca falhar.
const categoriasIniciais: Categoria[] = [
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

// Deixa o texto sem acento e minúsculo, para "limao" achar "Limão"
function normalizar(texto: string) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const IMAGEM_PADRAO = require("@/assets/images/img/sem-imagem.png");

type Produto = {
    id: number;
    slug: string;
    nome: string;
    descricao: string;
    idCategoria: number;
    preco: string;
    imagem: any;
};

type ProdutoApi = {
    id_produto: number;
    id_categoria: number;
    slug_produto: string;
    nome_produto: string;
    descricao_produto: string;
    valor_produto: number;
    foto_produto: string;
    status_produto: "ATIVO" | "INATIVO";
};

export default function CardapioScreen() {
    const [categorias, setCategorias] = useState<Categoria[]>(categoriasIniciais);

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

    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [imagensComErro, setImagensComErro] = useState<number[]>([]);

    function marcarImagemComErro(id: number) {
        setImagensComErro((atual) => (atual.includes(id) ? atual : [...atual, id]));
    }

    // Carregar os produtos da API
    useEffect(() => {
        async function carregarProdutos() {
            try {
                const resposta = await fetch(`${API_BASE_URL}/api/v1/produtos`);
                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status} ao buscar produtos`);
                }
                const json = await resposta.json();
                const produtosAtivos: Produto[] = json.data
                    .filter((produto: ProdutoApi) => produto.status_produto === "ATIVO")
                    .sort((a: ProdutoApi, b: ProdutoApi) =>
                        a.nome_produto.localeCompare(b.nome_produto, "pt-BR", { sensitivity: "base" })
                    )
                    .map((produto: ProdutoApi) => ({
                        id: produto.id_produto,
                        slug: produto.slug_produto,
                        nome: produto.nome_produto,
                        descricao: produto.descricao_produto,
                        idCategoria: produto.id_categoria,
                        preco: `R$${produto.valor_produto.toFixed(2).replace(".", ",")}`,
                        imagem: { uri: `${API_BASE_URL}/davilla/images/${produto.foto_produto}` },
                    }));
                setProdutos(produtosAtivos);
            } catch (erro) {
                console.error("Erro ao carregar produtos:", erro);
            }
        }

        carregarProdutos();
    }, []);

    // Quando vem da busca da Home com ?busca=texto, já abre filtrado
    const { busca: buscaParam } = useLocalSearchParams<{ busca?: string }>();
    const [busca, setBusca] = useState(buscaParam ?? "");

    useEffect(() => {
        if (buscaParam !== undefined) setBusca(buscaParam);
    }, [buscaParam]);
    const termoBusca = normalizar(busca.trim());

    // Uma seção por categoria, só com as que têm produtos (já filtrados pela busca)
    const cardapio = categorias
        .map((categoria) => ({
            id: categoria.id,
            categoria: categoria.nome,
            produtos: produtos.filter(
                (produto) =>
                    produto.idCategoria === categoria.id &&
                    (!termoBusca ||
                        normalizar(produto.nome).includes(termoBusca) ||
                        normalizar(produto.descricao).includes(termoBusca) ||
                        normalizar(categoria.nome).includes(termoBusca))
            ),
        }))
        .filter((secao) => secao.produtos.length > 0);

    // Rolar até a seção da categoria clicada
    const scrollRef = useRef<ScrollView>(null);
    const posicaoMainRef = useRef<number | null>(null);
    const jaRolouParamRef = useRef(false);
    const posicaoSecoesRef = useRef<Record<number, number>>({});
    const { categoria: categoriaParam } = useLocalSearchParams<{ categoria?: string }>();

    function irParaCategoria(idCategoria: number) {
        const posicaoSecao = posicaoSecoesRef.current[idCategoria];
        if (posicaoSecao === undefined) return;
        scrollRef.current?.scrollTo({
            y: (posicaoMainRef.current ?? 0) + posicaoSecao - 10,
            animated: true,
        });
    }

    // Quando vem da Home com ?categoria=ID, rola uma vez, assim que a seção
    // e o bloco principal já tiverem sido medidos
    function rolarParaCategoriaDoParam() {
        if (!categoriaParam || jaRolouParamRef.current) return;
        const idCategoria = Number(categoriaParam);
        if (posicaoMainRef.current === null) return;
        if (posicaoSecoesRef.current[idCategoria] === undefined) return;
        jaRolouParamRef.current = true;
        irParaCategoria(idCategoria);
    }

    function aoMedirSecao(idCategoria: number, y: number) {
        posicaoSecoesRef.current[idCategoria] = y;
        rolarParaCategoriaDoParam();
    }

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView ref={scrollRef} style={globalStyle.scrollConteudo}>
                        <View style={cardapioStyle.header}>
                            <View style={cardapioStyle.conteudo}>
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
                        <View
                            style={cardapioStyle.main}
                            onLayout={(evento) => {
                                posicaoMainRef.current = evento.nativeEvent.layout.y;
                                rolarParaCategoriaDoParam();
                            }}
                        >

                            <View style={cardapioStyle.buscaPoduto}>
                                <TextInput style={cardapioStyle.txtProduto}
                                    placeholder="Buscar produto"
                                    placeholderTextColor={cores.cinzclaro}
                                    value={busca}
                                    onChangeText={setBusca}
                                    returnKeyType="search"
                                    onSubmitEditing={Keyboard.dismiss}
                                />
                                <Pressable style={cardapioStyle.btnBuscar} onPress={Keyboard.dismiss}>
                                    <Image
                                        style={cardapioStyle.imgBuscar}
                                        source={require("@/assets/images/img/lupa.png")}
                                    />
                                </Pressable>
                            </View>

                            <View style={cardapioStyle.categoria}>
                                <View style={cardapioStyle.conteudoCategoria}>
                                    {categorias.map((item, indice) => (
                                        <Pressable
                                            key={item.id}
                                            style={[
                                                cardapioStyle.itemCategoria,
                                                indice % 3 !== 2 && cardapioStyle.itemCategoriaMeio,
                                            ]}
                                            onPress={() => irParaCategoria(item.id)}
                                        >
                                            <Text style={cardapioStyle.txtCategoria} numberOfLines={2}>
                                                {item.nome}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {termoBusca !== "" && cardapio.length === 0 && (
                                <Text style={cardapioStyle.subtitulo}>
                                    Nenhum produto encontrado para "{busca.trim()}".
                                </Text>
                            )}

                            {cardapio.map((secao) => (
                                <View
                                    key={secao.id}
                                    style={cardapioStyle.destaque}
                                    onLayout={(evento) =>
                                        aoMedirSecao(secao.id, evento.nativeEvent.layout.y)
                                    }
                                >
                                    <Text style={cardapioStyle.tituloSecao}>
                                        {secao.categoria}
                                    </Text>
                                    <View style={cardapioStyle.listaDestaque}>
                                        {secao.produtos.map((item) => (
                                            <View key={item.id} style={cardapioStyle.cardDestaque}>
                                                <Pressable
                                                    onPress={() =>
                                                        router.push({
                                                            pathname: "/detalhesProduto",
                                                            params: { slug: item.slug },
                                                        })
                                                    }
                                                >
                                                    <View style={cardapioStyle.wrapperImgDestaque}>
                                                        <Image
                                                            style={cardapioStyle.imgDestaque}
                                                            source={
                                                                imagensComErro.includes(item.id)
                                                                    ? IMAGEM_PADRAO
                                                                    : item.imagem
                                                            }
                                                            onError={() => marcarImagemComErro(item.id)}
                                                        />
                                                        <View style={cardapioStyle.badgeDestaque}>
                                                            <Text style={cardapioStyle.txtEstrela}>☆</Text>
                                                        </View>
                                                    </View>
                                                    <Text style={cardapioStyle.nomeDestaque} numberOfLines={2}>
                                                        {item.nome}
                                                    </Text>
                                                    <Text style={cardapioStyle.descricaoDestaque} numberOfLines={2}>
                                                        {item.descricao}
                                                    </Text>
                                                </Pressable>
                                                <View style={cardapioStyle.rodapeDestaque}>
                                                    <Text style={cardapioStyle.precoDestaque}>
                                                        {item.preco}
                                                    </Text>
                                                    <Pressable style={cardapioStyle.btnAdicionar} onPress={() =>
                                                            router.navigate({
                                                                pathname: "/detalhesProduto",
                                                                params: { slug: item.slug },
                                                            })
                                                        }>
                                                        <Image
                                                            style={cardapioStyle.imgAdicionar}
                                                            source={require("@/assets/images/img/mais.png")}
                                                        />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>

                    </ScrollView>

                    <Pressable
                        style={cardapioStyle.btnVoltarFixo}
                        onPress={() => router.back()}
                    >
                        <Image
                            style={cardapioStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
