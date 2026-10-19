import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Linking,
    Pressable,
    Text,
    TextInput,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import faleConoscoStyle from "@/styles/faleConoscoStyle";
import Footer from "@/components/footer";
import { voltar } from "@/utils/navegacao";
import { cores } from "@/styles/variaveis";
import { enviarMensagemContato } from "@/utils/contato";
import { formatarWhatsapp, useConfiguracoes } from "@/utils/loja";

export default function FaleConoscoScreen() {
    const [assunto, setAssunto] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const loja = useConfiguracoes();

    async function enviar() {
        setErro("");
        setSucesso("");
        if (!assunto.trim()) return setErro("Informe o assunto.");
        if (!mensagem.trim()) return setErro("Escreva a mensagem.");

        setEnviando(true);
        try {
            setSucesso(await enviarMensagemContato(assunto, mensagem));
            setAssunto("");
            setMensagem("");
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível enviar a mensagem.");
        } finally {
            setEnviando(false);
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
                        <View style={faleConoscoStyle.header}>
                            <View style={faleConoscoStyle.conteudo}>
                                <Image
                                    style={faleConoscoStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={faleConoscoStyle.titulo}>Fale Conosco</Text>
                            <Text style={faleConoscoStyle.subtitulo}>
                                Envie sua mensagem para o The Gusta
                            </Text>
                        </View>

                        <View style={faleConoscoStyle.main}>
                            <View style={faleConoscoStyle.campo}>
                                <Image
                                    style={faleConoscoStyle.iconeCampo}
                                    source={require("@/assets/images/img/assunto.png")}
                                />
                                <TextInput
                                    style={faleConoscoStyle.inputCampo}
                                    placeholder="Assunto"
                                    placeholderTextColor={cores.cinzclaro}
                                    value={assunto}
                                    onChangeText={setAssunto}
                                    maxLength={30}
                                />
                            </View>

                            <View style={faleConoscoStyle.campoMensagem}>
                                <Image
                                    style={faleConoscoStyle.iconeMensagem}
                                    source={require("@/assets/images/img/mensagem.png")}
                                />
                                <TextInput
                                    style={faleConoscoStyle.inputMensagem}
                                    placeholder="Mensagem"
                                    placeholderTextColor={cores.cinzclaro}
                                    multiline
                                    numberOfLines={6}
                                    value={mensagem}
                                    onChangeText={setMensagem}
                                    maxLength={2000}
                                />
                            </View>

                            {erro ? <Text style={faleConoscoStyle.txtErro}>{erro}</Text> : null}
                            {sucesso ? <Text style={faleConoscoStyle.txtSucesso}>{sucesso}</Text> : null}

                            <Pressable
                                style={[faleConoscoStyle.btnEnviar, enviando && { opacity: 0.6 }]}
                                onPress={enviar}
                                disabled={enviando}
                            >
                                <Text style={faleConoscoStyle.txtEnviar}>
                                    {enviando ? "Enviando..." : "Enviar mensagem"}
                                </Text>
                            </Pressable>

                            <View style={faleConoscoStyle.cardAtendimento}>
                                <View style={faleConoscoStyle.infoAtendimento}>
                                    <Text style={faleConoscoStyle.tituloAtendimento}>
                                        Atendimento
                                    </Text>
                                    {/* Tocar abre o WhatsApp / o e-mail da loja */}
                                    <Text
                                        style={faleConoscoStyle.txtValor}
                                        onPress={() => Linking.openURL(`https://wa.me/${loja.whatsapp}`)}
                                    >
                                        {formatarWhatsapp(loja.whatsapp)} (WhatsApp)
                                    </Text>
                                    <Text style={faleConoscoStyle.txtLabel}>E-mail</Text>
                                    <Text
                                        style={faleConoscoStyle.txtValor}
                                        onPress={() => Linking.openURL(`mailto:${loja.email}`)}
                                    >
                                        {loja.email}
                                    </Text>
                                    <Text style={faleConoscoStyle.txtLabel}>
                                        Horário de atendimento
                                    </Text>
                                    <Text style={faleConoscoStyle.txtValor}>
                                        Seg à Sáb, das 9h às 18h
                                    </Text>
                                </View>
                                <View style={faleConoscoStyle.iconeCaixaAtendimento}>
                                    <Image
                                        style={faleConoscoStyle.imgIconeAtendimento}
                                        source={require("@/assets/images/img/mensagem.png")}
                                    />
                                </View>
                            </View>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={faleConoscoStyle.btnVoltar}
                        onPress={() => voltar("/configuracoes")}
                    >
                        <Image
                            style={faleConoscoStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
