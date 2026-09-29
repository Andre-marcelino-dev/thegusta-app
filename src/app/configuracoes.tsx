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
import configuracoesStyle from "@/styles/configuracoesStyle";
import Footer from "@/components/footer";

export default function ConfiguracoesScreen() {
    const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

    return (
        <View style={globalStyle.container}>
            <ImageBackground
                source={require("@/assets/images/img/00_fundo.png")}
                style={globalStyle.background}
                resizeMode="stretch"
            >
                <SafeAreaView style={globalStyle.areaConteudo}>
                    <ScrollView style={globalStyle.scrollConteudo}>
                        <View style={configuracoesStyle.header}>
                            <View style={configuracoesStyle.conteudo}>
                                <Image
                                    style={configuracoesStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={configuracoesStyle.titulo}>Configurações</Text>
                            <Text style={configuracoesStyle.subtitulo}>
                                Gerencie seu perfil, endereços, entre outros
                            </Text>
                        </View>

                        <View style={configuracoesStyle.main}>
                            <View style={configuracoesStyle.cardUsuario}>
                                <View style={configuracoesStyle.avatarUsuario}>
                                    <Image
                                        style={configuracoesStyle.imgAvatarUsuario}
                                        source={require("@/assets/images/img/perfil.png")}
                                    />
                                </View>
                                <View style={configuracoesStyle.infoUsuario}>
                                    <Text style={configuracoesStyle.nomeUsuario}>
                                        Olá, Cliente
                                    </Text>
                                    <Text style={configuracoesStyle.descricaoUsuario}>
                                        Acesse e organize sua experiência no app
                                    </Text>
                                </View>
                            </View>

                            <View style={configuracoesStyle.secao}>
                                <Text style={configuracoesStyle.tituloSecao}>Minha conta</Text>

                                <Pressable
                                    style={configuracoesStyle.itemConta}
                                    onPress={() => router.push("/editarPerfil")}
                                >
                                    <View style={configuracoesStyle.iconeCaixaItem}>
                                        <Image
                                            style={configuracoesStyle.imgItem}
                                            source={require("@/assets/images/img/perfil.png")}
                                        />
                                    </View>
                                    <View style={configuracoesStyle.infoItem}>
                                        <Text style={configuracoesStyle.tituloItem}>Perfil</Text>
                                        <Text style={configuracoesStyle.descricaoItem}>
                                            Dados pessoais, telefone e e-mail
                                        </Text>
                                    </View>
                                    <Text style={configuracoesStyle.txtSeta}>&gt;</Text>
                                </Pressable>

                                <Pressable
                                    style={configuracoesStyle.itemConta}
                                    onPress={() => router.push("/enderecos")}
                                >
                                    <View style={configuracoesStyle.iconeCaixaItem}>
                                        <Image
                                            style={configuracoesStyle.imgItem}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                    </View>
                                    <View style={configuracoesStyle.infoItem}>
                                        <Text style={configuracoesStyle.tituloItem}>
                                            Endereço
                                        </Text>
                                        <Text style={configuracoesStyle.descricaoItem}>
                                            Gerencie seus endereços de entrega
                                        </Text>
                                    </View>
                                    <Text style={configuracoesStyle.txtSeta}>&gt;</Text>
                                </Pressable>

                                <Pressable
                                    style={configuracoesStyle.itemConta}
                                    onPress={() => router.push("/alterarSenha")}
                                >
                                    <View style={configuracoesStyle.iconeCaixaItem}>
                                        <Image
                                            style={configuracoesStyle.imgItem}
                                            source={require("@/assets/images/img/senha.png")}
                                        />
                                    </View>
                                    <View style={configuracoesStyle.infoItem}>
                                        <Text style={configuracoesStyle.tituloItem}>
                                            Alterar senha
                                        </Text>
                                        <Text style={configuracoesStyle.descricaoItem}>
                                            Atualize sua senha com segurança
                                        </Text>
                                    </View>
                                    <Text style={configuracoesStyle.txtSeta}>&gt;</Text>
                                </Pressable>
                            </View>

                            <View style={configuracoesStyle.secao}>
                                <Text style={configuracoesStyle.tituloSecao}>App</Text>

                                <View style={configuracoesStyle.itemConta}>
                                    <View style={configuracoesStyle.iconeCaixaItem}>
                                        <Image
                                            style={configuracoesStyle.imgItem}
                                            source={require("@/assets/images/img/download.png")}
                                        />
                                    </View>
                                    <View style={configuracoesStyle.infoItem}>
                                        <Text style={configuracoesStyle.tituloItem}>
                                            Instalar aplicativo
                                        </Text>
                                        <Text style={configuracoesStyle.descricaoItem}>
                                            Adicione o app à sua tela inicial
                                        </Text>
                                    </View>
                                    <Pressable style={configuracoesStyle.btnInstalar}>
                                        <Text style={configuracoesStyle.txtBtnInstalar}>
                                            Instalar
                                        </Text>
                                    </Pressable>
                                </View>

                                <View style={configuracoesStyle.itemConta}>
                                    <View style={configuracoesStyle.iconeCaixaItem}>
                                        <Image
                                            style={configuracoesStyle.imgItem}
                                            source={require("@/assets/images/img/notificacao.png")}
                                        />
                                    </View>
                                    <View style={configuracoesStyle.infoItem}>
                                        <Text style={configuracoesStyle.tituloItem}>
                                            Ativar notificações
                                        </Text>
                                        <Text style={configuracoesStyle.descricaoItem}>
                                            Receba status do pedido e promoções
                                        </Text>
                                    </View>
                                    <Pressable
                                        style={configuracoesStyle.btnToggle}
                                        onPress={() =>
                                            setNotificacoesAtivas((valor) => !valor)
                                        }
                                    >
                                        <Image
                                            style={configuracoesStyle.imgToggle}
                                            source={
                                                notificacoesAtivas
                                                    ? require("@/assets/images/img/ativo.png")
                                                    : require("@/assets/images/img/inativo.png")
                                            }
                                        />
                                    </Pressable>
                                </View>
                            </View>

                            <View style={configuracoesStyle.secao}>
                                <Text style={configuracoesStyle.tituloSecao}>
                                    Relacionamento
                                </Text>

                                <Pressable
                                    style={configuracoesStyle.itemConta}
                                    onPress={() => router.push("/depoimentos")}
                                >
                                    <View style={configuracoesStyle.iconeCaixaItem}>
                                        <Image
                                            style={configuracoesStyle.imgItem}
                                            source={require("@/assets/images/img/depoimento.png")}
                                        />
                                    </View>
                                    <View style={configuracoesStyle.infoItem}>
                                        <Text style={configuracoesStyle.tituloItem}>
                                            Depoimentos
                                        </Text>
                                        <Text style={configuracoesStyle.descricaoItem}>
                                            Veja o que nossos clientes avaliam
                                        </Text>
                                    </View>
                                    <Text style={configuracoesStyle.txtSeta}>&gt;</Text>
                                </Pressable>

                                <Pressable
                                    style={configuracoesStyle.itemConta}
                                    onPress={() => router.push("/faleConosco")}
                                >
                                    <View style={configuracoesStyle.iconeCaixaItem}>
                                        <Image
                                            style={configuracoesStyle.imgItem}
                                            source={require("@/assets/images/img/fale_conosco.png")}
                                        />
                                    </View>
                                    <View style={configuracoesStyle.infoItem}>
                                        <Text style={configuracoesStyle.tituloItem}>
                                            Fale conosco
                                        </Text>
                                        <Text style={configuracoesStyle.descricaoItem}>
                                            Tire suas dúvidas e envie sugestões
                                        </Text>
                                    </View>
                                    <Text style={configuracoesStyle.txtSeta}>&gt;</Text>
                                </Pressable>
                            </View>

                            <Pressable
                                style={configuracoesStyle.btnSair}
                                onPress={() => router.replace("/")}
                            >
                                <Text style={configuracoesStyle.txtSair}>Sair da conta</Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={configuracoesStyle.btnVoltar}
                        onPress={() => router.back()}
                    >
                        <Image
                            style={configuracoesStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
