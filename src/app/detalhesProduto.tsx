import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
import produtoStyle from "@/styles/produtoStyle";
import Footer from "@/components/footer";
import { API_BASE_URL } from "@/utils/categorias";
import { adicionarNaSacola } from "@/utils/sacola";


type Produto = {
    id?: number;
    nome: string;
    categoria: string;
    preco: number;
    imagem: any;
    resumo: string;
    descricao: string;
};

type ProdutoApi = {
    id_produto: number;
    nome_produto: string;
    descricao_produto: string;
    valor_produto: number;
    foto_produto: string;
    tamanho_produto: string;
    unid_medida_produto: string;
    categoria_produto: { nome_categoria: string };
};

const unidadesMedida: Record<string, string> = {
    UN: "Unidade",
    FT: "Fatia",
    CX: "Caixa",
    ML: "Copo",
};

// O banco só tem uma descrição, então o resumo mostra o tamanho e a unidade.
function montarResumo(produto: ProdutoApi) {
    const unidade =
        unidadesMedida[produto.unid_medida_produto] ?? produto.unid_medida_produto;
    return [produto.tamanho_produto && `Tamanho: ${produto.tamanho_produto}`, unidade]
        .filter(Boolean)
        .join(" · ");
}

// Usado enquanto a API carrega (fica vazio para não mostrar um produto que não é o escolhido).
const produtoPadrao: Produto = {
    nome: "",
    categoria: "",
    preco: 0,
    imagem: require("@/assets/images/img/sem-imagem.png"),
    resumo: "",
    descricao: "",
};

export default function ProdutoScreen() {
    const { slug } = useLocalSearchParams<{ slug?: string }>();
    const [produto, setProduto] = useState<Produto>(produtoPadrao);
    const [imagemComErro, setImagemComErro] = useState(false);
    const [quantidade, setQuantidade] = useState(1);

    useEffect(() => {
        setQuantidade(1);

        if (!slug) {
            console.warn("Tela de produto aberta sem slug.");
            return;
        }

        async function carregarProduto() {
            try {
                const resposta = await fetch(`${API_BASE_URL}/api/v1/produtos/${slug}`);
                if (!resposta.ok) {
                    throw new Error(`Erro ${resposta.status} ao buscar produto`);
                }
                const json = await resposta.json();
                const produtoApi: ProdutoApi = json.data;

                setImagemComErro(false);
                setProduto({
                    id: produtoApi.id_produto,
                    nome: produtoApi.nome_produto,
                    categoria: produtoApi.categoria_produto.nome_categoria,
                    preco: produtoApi.valor_produto,
                    imagem: {
                        uri: `${API_BASE_URL}/davilla/images/${produtoApi.foto_produto}`,
                    },
                    resumo: montarResumo(produtoApi),
                    descricao: produtoApi.descricao_produto,
                });
            } catch (erro) {
                console.error("Erro ao carregar produto:", erro);
            }
        }

        carregarProduto();
    }, [slug]);

    const subtotal = produto.preco * quantidade;

    function diminuir() {
        setQuantidade((valor) => (valor > 1 ? valor - 1 : 1));
    }

    function aumentar() {
        setQuantidade((valor) => valor + 1);
    }

    // Grava o produto na sacola do cliente logado e abre a sacola
    async function adicionarSacola() {
        if (produto.id) {
            try {
                await adicionarNaSacola(produto.id, quantidade);
            } catch (erro) {
                console.error("Erro ao adicionar na sacola:", erro);
            }
        }
        router.push("/sacola");
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
                        <View style={produtoStyle.header}>
                            <View style={produtoStyle.topo}>
                                <Text style={produtoStyle.titulo} numberOfLines={1}>
                                    {produto.nome}
                                </Text>
                                <Pressable style={produtoStyle.btnTopo}>
                                    <Text style={produtoStyle.txtFavorito}>★</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={produtoStyle.main}>
                            <Image
                                style={produtoStyle.imgProduto}
                                source={
                                    imagemComErro
                                        ? produtoPadrao.imagem
                                        : produto.imagem
                                }
                                onError={() => setImagemComErro(true)}
                            />

                            <View style={produtoStyle.conteudoTitulo}>
                                <Text style={produtoStyle.preco}>
                                    R${produto.preco.toFixed(2).replace(".", ",")}
                                </Text>
                                <Text style={produtoStyle.categoria}>{produto.categoria}</Text>
                            </View>

                            <Text style={produtoStyle.textoResumo}>{produto.resumo}</Text>

                            <Text style={produtoStyle.tituloSecao}>Descrição</Text>
                            <Text style={produtoStyle.textoDescricao}>
                                {produto.descricao}
                            </Text>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={produtoStyle.btnVoltar}
                        onPress={() => router.back()}
                    >
                        <Image
                            style={produtoStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <View style={produtoStyle.rodapeCompra}>
                        <View style={produtoStyle.linhaRodape}>
                            <View style={produtoStyle.quantidade}>
                                <Pressable style={produtoStyle.btnQuantidade} onPress={diminuir}>
                                    <Text style={produtoStyle.txtBtnQuantidade}>-</Text>
                                </Pressable>
                                <Text style={produtoStyle.txtQuantidade}>{quantidade}</Text>
                                <Pressable style={produtoStyle.btnQuantidade} onPress={aumentar}>
                                    <Text style={produtoStyle.txtBtnQuantidade}>+</Text>
                                </Pressable>
                            </View>

                            <View style={produtoStyle.subtotal}>
                                <Text style={produtoStyle.txtSubtotalLabel}>Subtotal</Text>
                                <Text style={produtoStyle.txtSubtotalValor}>
                                    R${subtotal.toFixed(2).replace(".", ",")}
                                </Text>
                            </View>
                        </View>

                        <Pressable
                            style={produtoStyle.btnAdicionarSacola}
                            onPress={adicionarSacola}
                        >
                            <Text style={produtoStyle.txtAdicionarSacola}>
                                Adicionar a sacola
                            </Text>
                        </Pressable>
                    </View>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
