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
import produtoStyle from "@/styles/produtoStyle";
import Footer from "@/components/footer";

const produto = {
    nome: "Bolo de Banana Fit",
    categoria: "Bolos",
    preco: 18.8,
    imagem: require("@/assets/images/img/bolo01.png"),
    resumo:
        "Feito com aveia e adoçado naturalmente pela fruta, sem adição de açúcar ou farinha de trigo. A opção perfeita e saudável para acompanhar seu café.",
    descricao:
        "Bolo de banana fit, uma alternativa leve e cheia de energia para sua rotina. Desenvolvido sem farinha de trigo e sem açúcar refinado, ele é adoçado exclusivamente pela doçura natural das bananas maduras, garantindo um sabor autêntico e aconchegante. Rico em fibras graças à adição de aveia, este bolo une saudabilidade e sabor em cada fatia, sendo ideal para o momento do café.",
};

export default function ProdutoScreen() {
    const [quantidade, setQuantidade] = useState(2);

    const subtotal = produto.preco * quantidade;

    function diminuir() {
        setQuantidade((valor) => (valor > 1 ? valor - 1 : 1));
    }

    function aumentar() {
        setQuantidade((valor) => valor + 1);
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
                                <Pressable
                                    style={produtoStyle.btnTopo}
                                    onPress={() => router.back()}
                                >
                                    <Image
                                        style={produtoStyle.iconeTopo}
                                        source={require("@/assets/images/img/voltar.png")}
                                    />
                                </Pressable>
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
                                source={produto.imagem}
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
                            onPress={() => router.push("/sacola")}
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
