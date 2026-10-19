import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
    Image,
    ImageBackground,
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    View,
    ScrollView,
} from "react-native";

import globalStyle from "@/styles/globalStyle";
import editarPerfilStyle from "@/styles/editarPerfilStyle";
import Footer from "@/components/footer";
import { voltar } from "@/utils/navegacao";
import { cores } from "@/styles/variaveis";
import {
    atualizarCliente,
    buscarClienteLogado,
    enviarFotoCliente,
    urlFotoCliente,
} from "@/utils/auth";

// "aaaa-mm-dd..." (banco) -> "dd/mm/aaaa" (tela)
function dataParaTela(data?: string) {
    if (!data) return "";
    const [ano, mes, dia] = data.slice(0, 10).split("-");
    return `${dia}/${mes}/${ano}`;
}

// "dd/mm/aaaa" (tela) -> "aaaa-mm-dd" (banco)
function dataParaBanco(data: string) {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`;
}

// Coloca as barras sozinho enquanto a pessoa digita a data
function mascararData(texto: string) {
    const numeros = texto.replace(/\D/g, "").slice(0, 8);
    if (numeros.length > 4) return `${numeros.slice(0, 2)}/${numeros.slice(2, 4)}/${numeros.slice(4)}`;
    if (numeros.length > 2) return `${numeros.slice(0, 2)}/${numeros.slice(2)}`;
    return numeros;
}

// Formata o telefone enquanto a pessoa digita: "(11)98888-7777".
// Sem espaço, para caber nos 14 caracteres da coluna do banco.
function mascararTelefone(texto: string) {
    const numeros = texto.replace(/\D/g, "").slice(0, 11);
    if (numeros.length <= 2) return numeros.length ? `(${numeros}` : "";
    const ddd = numeros.slice(0, 2);
    const resto = numeros.slice(2);
    // Celular (9 dígitos) quebra depois do 5º; fixo (8 dígitos) depois do 4º
    const corte = resto.length > 8 ? 5 : 4;
    if (resto.length <= corte) return `(${ddd})${resto}`;
    return `(${ddd})${resto.slice(0, corte)}-${resto.slice(corte)}`;
}

export default function EditarPerfilScreen() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [nascimento, setNascimento] = useState("");
    // Começa desligado: só recebe promoções quem aceitar (o valor salvo vem do banco)
    const [receberNovidades, setReceberNovidades] = useState(false);
    const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
    const [salvando, setSalvando] = useState(false);
    const [enviandoFoto, setEnviandoFoto] = useState(false);
    // Janelinha "Tirar foto / Escolher da galeria"
    const [modalFoto, setModalFoto] = useState(false);
    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");

    // Carrega do banco os dados de quem está logado
    useEffect(() => {
        async function carregarPerfil() {
            try {
                const cliente = await buscarClienteLogado();
                if (!cliente) {
                    setErro("Não foi possível carregar seus dados. Faça login novamente.");
                    return;
                }
                setNome(cliente.nome_cliente ?? "");
                setEmail(cliente.email_cliente ?? "");
                setTelefone(mascararTelefone(cliente.telefone_cliente ?? ""));
                setCpf(cliente.cpf_cnpj_cliente ?? "");
                setNascimento(dataParaTela(cliente.data_nasc_cliente));
                setReceberNovidades(cliente.novidades_cliente === "SIM");
                setFotoPerfil(urlFotoCliente(cliente));
            } catch (e) {
                console.error("Erro ao carregar perfil:", e);
                setErro("Não foi possível carregar seus dados.");
            }
        }

        carregarPerfil();
    }, []);

    // Abre a galeria, deixa recortar em quadrado e envia a foto para a API
    // Abre a câmera ou a galeria, deixa recortar em quadrado e envia a foto para a API
    async function escolherFoto(origem: "camera" | "galeria") {
        setModalFoto(false);
        setErro("");
        setSucesso("");

        const opcoes: ImagePicker.ImagePickerOptions = {
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5, // a API aceita até 2 MB
        };

        // Na web o navegador cuida da permissão, e a câmera precisa abrir direto no toque
        if (Platform.OS !== "web") {
            const permissao =
                origem === "camera"
                    ? await ImagePicker.requestCameraPermissionsAsync()
                    : await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!permissao.granted) {
                setErro(
                    origem === "camera"
                        ? "Permita o acesso à câmera para tirar a foto do perfil."
                        : "Permita o acesso às fotos para alterar a foto do perfil."
                );
                return;
            }
        }

        const resultado =
            origem === "camera"
                ? await ImagePicker.launchCameraAsync(opcoes)
                : await ImagePicker.launchImageLibraryAsync(opcoes);
        if (resultado.canceled || !resultado.assets?.[0]) return;

        setEnviandoFoto(true);
        try {
            const cliente = await enviarFotoCliente(resultado.assets[0]);
            setFotoPerfil(urlFotoCliente(cliente));
            setSucesso("Foto atualizada com sucesso.");
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível enviar a foto.");
        } finally {
            setEnviandoFoto(false);
        }
    }

    async function salvarPerfil() {
        setErro("");
        setSucesso("");

        if (nome.trim() === "" || telefone.trim() === "") {
            setErro("Preencha o nome e o telefone.");
            return;
        }
        if (telefone.replace(/\D/g, "").length < 10) {
            setErro("Informe o telefone com DDD, ex.: (11)98888-7777.");
            return;
        }
        if (!/^\d{2}\/\d{2}\/\d{4}$/.test(nascimento)) {
            setErro("Informe a data de nascimento no formato dd/mm/aaaa.");
            return;
        }

        setSalvando(true);
        try {
            await atualizarCliente({
                nome_cliente: nome.trim(),
                telefone_cliente: telefone.trim(),
                data_nasc_cliente: dataParaBanco(nascimento),
                novidades_cliente: receberNovidades ? "SIM" : "NAO",
            });
            setSucesso("Dados atualizados com sucesso.");
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível salvar.");
        } finally {
            setSalvando(false);
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
                        <View style={editarPerfilStyle.header}>
                            <View style={editarPerfilStyle.conteudo}>
                                <Image
                                    style={editarPerfilStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={editarPerfilStyle.titulo}>Editar perfil</Text>
                            <Text style={editarPerfilStyle.subtitulo}>
                                Atualize seus dados pessoais
                            </Text>
                        </View>

                        <View style={editarPerfilStyle.main}>
                            <View style={editarPerfilStyle.cardFoto}>
                                <View style={editarPerfilStyle.linhaFoto}>
                                    <Pressable
                                        style={editarPerfilStyle.avatarFoto}
                                        onPress={() => setModalFoto(true)}
                                        disabled={enviandoFoto}
                                    >
                                        {fotoPerfil !== null ? (
                                            <Image
                                                style={editarPerfilStyle.fotoAvatar}
                                                source={{ uri: fotoPerfil }}
                                                onError={() => setFotoPerfil(null)}
                                            />
                                        ) : (
                                            <Image
                                                style={editarPerfilStyle.imgAvatarFoto}
                                                source={require("@/assets/images/img/perfil.png")}
                                            />
                                        )}
                                    </Pressable>
                                    <Pressable
                                        style={editarPerfilStyle.btnAlterarFoto}
                                        onPress={() => setModalFoto(true)}
                                        disabled={enviandoFoto}
                                    >
                                        <Text style={editarPerfilStyle.txtAlterarFoto}>
                                            {enviandoFoto ? "Enviando..." : "Alterar foto"}
                                        </Text>
                                    </Pressable>
                                </View>
                                <Text style={editarPerfilStyle.txtDescricaoFoto}>
                                    A foto do perfil ajuda a personalizar e identificar sua
                                    conta
                                </Text>
                            </View>

                            <Modal
                                visible={modalFoto}
                                transparent
                                animationType="fade"
                                onRequestClose={() => setModalFoto(false)}
                            >
                                {/* Tocar fora da caixa fecha a janelinha */}
                                <Pressable
                                    style={editarPerfilStyle.modalFundo}
                                    onPress={() => setModalFoto(false)}
                                >
                                    <Pressable style={editarPerfilStyle.modalCaixa} onPress={() => {}}>
                                        <Text style={editarPerfilStyle.modalTitulo}>Foto do perfil</Text>

                                        <Pressable
                                            style={editarPerfilStyle.btnOpcaoFoto}
                                            onPress={() => escolherFoto("camera")}
                                        >
                                            <Text style={editarPerfilStyle.txtOpcaoFoto}>Tirar foto</Text>
                                        </Pressable>

                                        <Pressable
                                            style={editarPerfilStyle.btnOpcaoFoto}
                                            onPress={() => escolherFoto("galeria")}
                                        >
                                            <Text style={editarPerfilStyle.txtOpcaoFoto}>
                                                Escolher da galeria
                                            </Text>
                                        </Pressable>

                                        <Pressable
                                            style={editarPerfilStyle.btnCancelarFoto}
                                            onPress={() => setModalFoto(false)}
                                        >
                                            <Text style={editarPerfilStyle.txtCancelarFoto}>Cancelar</Text>
                                        </Pressable>
                                    </Pressable>
                                </Pressable>
                            </Modal>

                            <View style={editarPerfilStyle.form}>
                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/user.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="Seu nome completo aqui"
                                        placeholderTextColor={cores.cinzclaro}
                                        value={nome}
                                        onChangeText={setNome}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/email.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="seuemail@exemplo.com"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                        editable={false}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/telefone.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="(11)98888-7777"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="phone-pad"
                                        maxLength={14}
                                        value={telefone}
                                        onChangeText={(texto) => setTelefone(mascararTelefone(texto))}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/documento.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="000.000.000-00"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="numeric"
                                        value={cpf}
                                        onChangeText={setCpf}
                                        editable={false}
                                    />
                                </View>

                                <View style={editarPerfilStyle.campo}>
                                    <Image
                                        style={editarPerfilStyle.iconeCampo}
                                        source={require("@/assets/images/img/calendario.png")}
                                    />
                                    <TextInput
                                        style={editarPerfilStyle.inputCampo}
                                        placeholder="dd/mm/aaaa"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="numeric"
                                        value={nascimento}
                                        onChangeText={(texto) => setNascimento(mascararData(texto))}
                                    />
                                </View>
                            </View>

                            <View style={editarPerfilStyle.cardNotificacao}>
                                <View style={editarPerfilStyle.iconeCaixaNotificacao}>
                                    <Image
                                        style={editarPerfilStyle.imgIconeNotificacao}
                                        source={require("@/assets/images/img/notificacao.png")}
                                    />
                                </View>
                                <View style={editarPerfilStyle.infoNotificacao}>
                                    <Text style={editarPerfilStyle.tituloNotificacao}>
                                        Receber novidades e promoções
                                    </Text>
                                    <Text style={editarPerfilStyle.descricaoNotificacao}>
                                        Fique por dentro das nossas ofertas e sugestões
                                    </Text>
                                </View>
                                <Pressable
                                    onPress={() =>
                                        setReceberNovidades((valor) => !valor)
                                    }
                                >
                                    <Image
                                        style={editarPerfilStyle.imgToggle}
                                        source={
                                            receberNovidades
                                                ? require("@/assets/images/img/ativo.png")
                                                : require("@/assets/images/img/inativo.png")
                                        }
                                    />
                                </Pressable>
                            </View>

                            {erro !== "" && (
                                <Text style={editarPerfilStyle.txtErro}>{erro}</Text>
                            )}
                            {sucesso !== "" && (
                                <Text style={editarPerfilStyle.txtSucesso}>{sucesso}</Text>
                            )}

                            <Pressable
                                style={editarPerfilStyle.btnSalvar}
                                onPress={salvarPerfil}
                                disabled={salvando}
                            >
                                <Text style={editarPerfilStyle.txtSalvar}>
                                    {salvando ? "Salvando..." : "Salvar alterações"}
                                </Text>
                            </Pressable>

                            <Pressable
                                style={editarPerfilStyle.btnCancelar}
                                onPress={() => voltar("/configuracoes")}
                            >
                                <Text style={editarPerfilStyle.txtCancelar}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={editarPerfilStyle.btnVoltar}
                        onPress={() => voltar("/configuracoes")}
                    >
                        <Image
                            style={editarPerfilStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
