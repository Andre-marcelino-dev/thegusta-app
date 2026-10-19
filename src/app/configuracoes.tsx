import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Modal,
    Pressable,
    Text,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import configuracoesStyle from "@/styles/configuracoesStyle";
import Footer from "@/components/footer";
import { voltar } from "@/utils/navegacao";
import { buscarClienteLogado, Cliente, fazerLogout, urlFotoCliente } from "@/utils/auth";

export default function ConfiguracoesScreen() {
    // Janelinha "Deseja sair da conta?"
    const [modalSair, setModalSair] = useState(false);
    const [saindo, setSaindo] = useState(false);
    const [cliente, setCliente] = useState<Cliente | null>(null);

    // Busca de novo sempre que a tela aparece (ex.: ao voltar do Editar perfil com nome ou foto novos)
    useFocusEffect(
        useCallback(() => {
            buscarClienteLogado()
                .then(setCliente)
                .catch((e) => console.error("Erro ao carregar cliente:", e));
        }, [])
    );

    const primeiroNome = cliente?.nome_cliente?.trim().split(/\s+/)[0] || "Cliente";
    const fotoPerfil = urlFotoCliente(cliente);

    // Apaga o login guardado no aparelho (e avisa a API) e volta para a tela de login
    async function sairDaConta() {
        setSaindo(true);
        try {
            await fazerLogout();
        } finally {
            setSaindo(false);
            setModalSair(false);
            router.replace("/");
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
                            <Pressable
                                style={configuracoesStyle.cardUsuario}
                                onPress={() => router.push("/editarPerfil")}
                            >
                                <View style={configuracoesStyle.avatarUsuario}>
                                    {fotoPerfil !== null ? (
                                        <Image
                                            style={configuracoesStyle.fotoAvatarUsuario}
                                            source={{ uri: fotoPerfil }}
                                        />
                                    ) : (
                                        <Image
                                            style={configuracoesStyle.imgAvatarUsuario}
                                            source={require("@/assets/images/img/perfil.png")}
                                        />
                                    )}
                                </View>
                                <View style={configuracoesStyle.infoUsuario}>
                                    <Text style={configuracoesStyle.nomeUsuario} numberOfLines={1}>
                                        Olá, {primeiroNome}
                                    </Text>
                                    <Text style={configuracoesStyle.descricaoUsuario} numberOfLines={1}>
                                        {cliente?.email_cliente || "Acesse e organize sua experiência no app"}
                                    </Text>
                                </View>
                                <Text style={configuracoesStyle.txtSeta}>&gt;</Text>
                            </Pressable>

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
                                onPress={() => setModalSair(true)}
                            >
                                <Text style={configuracoesStyle.txtSair}>Sair da conta</Text>
                            </Pressable>

                            <Modal
                                visible={modalSair}
                                transparent
                                animationType="fade"
                                onRequestClose={() => !saindo && setModalSair(false)}
                            >
                                {/* Tocar fora da caixa fecha a janelinha */}
                                <Pressable
                                    style={configuracoesStyle.modalFundo}
                                    onPress={() => !saindo && setModalSair(false)}
                                >
                                    <Pressable style={configuracoesStyle.modalCaixa} onPress={() => {}}>
                                        <View style={configuracoesStyle.modalAlca} />

                                        <Text style={configuracoesStyle.modalTitulo}>Sair da conta?</Text>
                                        <Text style={configuracoesStyle.modalSubtitulo}>
                                            Você vai precisar entrar com seu e-mail e senha para fazer
                                            novos pedidos. Sua sacola continua salva.
                                        </Text>

                                        <Pressable
                                            style={({ pressed }) => [
                                                configuracoesStyle.btnConfirmarSair,
                                                (pressed || saindo) && configuracoesStyle.btnPressionado,
                                            ]}
                                            onPress={sairDaConta}
                                            disabled={saindo}
                                        >
                                            <Text style={configuracoesStyle.txtConfirmarSair}>
                                                {saindo ? "Saindo..." : "Sair"}
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={({ pressed }) => [
                                                configuracoesStyle.btnFicar,
                                                pressed && configuracoesStyle.btnPressionado,
                                            ]}
                                            onPress={() => setModalSair(false)}
                                            disabled={saindo}
                                        >
                                            <Text style={configuracoesStyle.txtFicar}>Cancelar</Text>
                                        </Pressable>
                                    </Pressable>
                                </Pressable>
                            </Modal>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={configuracoesStyle.btnVoltar}
                        onPress={() => voltar("/home")}
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
