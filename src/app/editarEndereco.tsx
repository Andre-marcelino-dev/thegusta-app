import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
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
import editarEnderecoStyle from "@/styles/editarEnderecoStyle";
import Footer from "@/components/footer";
import { voltar } from "@/utils/navegacao";
import { cores } from "@/styles/variaveis";
import { buscarCep, buscarEndereco, salvarEndereco } from "@/utils/enderecos";

// Coloca o traço sozinho enquanto a pessoa digita o CEP
function mascararCep(texto: string) {
    const numeros = texto.replace(/\D/g, "").slice(0, 8);
    return numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros;
}

export default function EditarEnderecoScreen() {
    // Com ?id= edita aquele endereço; sem id, adiciona um novo
    const { id } = useLocalSearchParams<{ id?: string }>();
    const idEndereco = id ? Number(id) : undefined;

    const [nomeEndereco, setNomeEndereco] = useState("");
    const [endereco, setEndereco] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [uf, setUf] = useState("");
    const [cep, setCep] = useState("");
    const [salvando, setSalvando] = useState(false);
    const [buscandoCep, setBuscandoCep] = useState(false);
    const [erro, setErro] = useState("");

    // Carrega do banco o endereço escolhido na lista
    useEffect(() => {
        if (!idEndereco) return;

        async function carregarEndereco() {
            try {
                const dados = await buscarEndereco(idEndereco!);
                setNomeEndereco(dados.nome_endereco);
                setEndereco(dados.endereco);
                setNumero(dados.numero);
                setComplemento(dados.complemento ?? "");
                setBairro(dados.bairro);
                setCidade(dados.cidade);
                setUf(dados.uf);
                setCep(dados.cep);
            } catch (e) {
                console.error("Erro ao carregar endereço:", e);
                setErro("Não foi possível carregar este endereço.");
            }
        }

        carregarEndereco();
    }, [idEndereco]);

    // Ao completar os 8 números do CEP, preenche rua, bairro, cidade e UF
    async function alterarCep(texto: string) {
        const cepFormatado = mascararCep(texto);
        setCep(cepFormatado);
        if (cepFormatado.length !== 9) return;

        setErro("");
        setBuscandoCep(true);
        try {
            const encontrado = await buscarCep(cepFormatado);
            if (!encontrado) {
                setErro("CEP não encontrado. Confira o número ou preencha o endereço.");
                return;
            }
            // Respeita o tamanho máximo das colunas do banco
            if (encontrado.endereco) setEndereco(encontrado.endereco.slice(0, 40));
            if (encontrado.bairro) setBairro(encontrado.bairro.slice(0, 40));
            if (encontrado.cidade) setCidade(encontrado.cidade.slice(0, 40));
            if (encontrado.uf) setUf(encontrado.uf);
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível consultar o CEP.");
        } finally {
            setBuscandoCep(false);
        }
    }

    async function salvar() {
        setErro("");

        const obrigatorios = [nomeEndereco, endereco, numero, bairro, cidade, uf, cep];
        if (obrigatorios.some((campo) => campo.trim() === "")) {
            setErro("Preencha todos os campos (só o complemento é opcional).");
            return;
        }
        if (uf.trim().length !== 2) {
            setErro("A UF deve ter 2 letras, por exemplo SP.");
            return;
        }

        setSalvando(true);
        try {
            await salvarEndereco(
                {
                    nome_endereco: nomeEndereco.trim(),
                    endereco: endereco.trim(),
                    numero: numero.trim(),
                    complemento: complemento.trim() || null,
                    bairro: bairro.trim(),
                    cidade: cidade.trim(),
                    uf: uf.trim().toUpperCase(),
                    cep: cep.trim(),
                },
                idEndereco
            );
            // Volta para a lista, que recarrega sozinha
            voltar("/enderecos");
        } catch (e) {
            setErro(e instanceof Error ? e.message : "Não foi possível salvar o endereço.");
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
                        <View style={editarEnderecoStyle.header}>
                            <View style={editarEnderecoStyle.conteudo}>
                                <Image
                                    style={editarEnderecoStyle.logo}
                                    source={require("@/assets/images/img/logo.png")}
                                />
                            </View>
                            <Text style={editarEnderecoStyle.titulo}>
                                {idEndereco ? "Editar endereço" : "Novo endereço"}
                            </Text>
                            <Text style={editarEnderecoStyle.subtitulo}>
                                {idEndereco
                                    ? "Edite o endereço selecionado"
                                    : "Cadastre um endereço de entrega"}
                            </Text>
                        </View>

                        <View style={editarEnderecoStyle.main}>
                            <View style={editarEnderecoStyle.form}>
                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Nome do endereço
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="Casa, Trabalho..."
                                        placeholderTextColor={cores.cinzclaro}
                                        maxLength={30}
                                        value={nomeEndereco}
                                        onChangeText={setNomeEndereco}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            {buscandoCep ? "CEP (buscando endereço...)" : "CEP"}
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="00000-000"
                                        placeholderTextColor={cores.cinzclaro}
                                        keyboardType="numeric"
                                        maxLength={9}
                                        value={cep}
                                        onChangeText={alterarCep}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Endereço
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="Rua, avenida..."
                                        placeholderTextColor={cores.cinzclaro}
                                        maxLength={40}
                                        value={endereco}
                                        onChangeText={setEndereco}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Número
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="1500"
                                        placeholderTextColor={cores.cinzclaro}
                                        maxLength={6}
                                        value={numero}
                                        onChangeText={setNumero}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Complemento (opcional)
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="Apto, bloco, sala..."
                                        placeholderTextColor={cores.cinzclaro}
                                        maxLength={50}
                                        value={complemento}
                                        onChangeText={setComplemento}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Bairro
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="Bairro"
                                        placeholderTextColor={cores.cinzclaro}
                                        maxLength={40}
                                        value={bairro}
                                        onChangeText={setBairro}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            Cidade
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="Cidade"
                                        placeholderTextColor={cores.cinzclaro}
                                        maxLength={40}
                                        value={cidade}
                                        onChangeText={setCidade}
                                    />
                                </View>

                                <View style={editarEnderecoStyle.campo}>
                                    <View style={editarEnderecoStyle.linhaLabel}>
                                        <Image
                                            style={editarEnderecoStyle.iconeCampo}
                                            source={require("@/assets/images/img/local.png")}
                                        />
                                        <Text style={editarEnderecoStyle.labelCampo}>
                                            UF
                                        </Text>
                                    </View>
                                    <TextInput
                                        style={editarEnderecoStyle.inputCampo}
                                        placeholder="SP"
                                        placeholderTextColor={cores.cinzclaro}
                                        autoCapitalize="characters"
                                        maxLength={2}
                                        value={uf}
                                        onChangeText={setUf}
                                    />
                                </View>

                            </View>

                            {erro !== "" && (
                                <Text style={editarEnderecoStyle.txtErro}>{erro}</Text>
                            )}

                            <Pressable
                                style={editarEnderecoStyle.btnSalvar}
                                onPress={salvar}
                                disabled={salvando}
                            >
                                <Text style={editarEnderecoStyle.txtSalvar}>
                                    {salvando
                                        ? "Salvando..."
                                        : idEndereco
                                          ? "Salvar alterações"
                                          : "Adicionar endereço"}
                                </Text>
                            </Pressable>

                            <Pressable
                                style={editarEnderecoStyle.btnCancelar}
                                onPress={() => voltar("/enderecos")}
                            >
                                <Text style={editarEnderecoStyle.txtCancelar}>
                                    Cancelar
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>

                    <Pressable
                        style={editarEnderecoStyle.btnVoltar}
                        onPress={() => voltar("/enderecos")}
                    >
                        <Image
                            style={editarEnderecoStyle.iconeVoltar}
                            source={require("@/assets/images/img/voltar.png")}
                        />
                    </Pressable>

                    <Footer />
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}
