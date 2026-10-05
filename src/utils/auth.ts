import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

import { API_BASE_URL } from "@/utils/categorias";

const CHAVE_TOKEN = "token_cliente";
const CHAVE_CLIENTE = "dados_cliente";

export type Cliente = {
    id_cliente: number;
    nome_cliente: string;
    email_cliente: string;
    telefone_cliente: string;
    foto_cliente?: string | null;
};

// O SecureStore não funciona na web, então lá usamos o localStorage.
async function salvar(chave: string, valor: string) {
    if (Platform.OS === "web") localStorage.setItem(chave, valor);
    else await SecureStore.setItemAsync(chave, valor);
}

async function ler(chave: string) {
    if (Platform.OS === "web") return localStorage.getItem(chave);
    return SecureStore.getItemAsync(chave);
}

async function apagar(chave: string) {
    if (Platform.OS === "web") localStorage.removeItem(chave);
    else await SecureStore.deleteItemAsync(chave);
}

// Faz o login na API e guarda o token e os dados do cliente no aparelho.
// Se der errado, lança um erro com a mensagem da API para mostrar na tela.
export async function fazerLogin(email: string, senha: string): Promise<Cliente> {
    const resposta = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha, device_name: `app-${Platform.OS}` }),
    });

    const json = await resposta.json().catch(() => null);

    if (!resposta.ok || !json?.success) {
        throw new Error(json?.message ?? `Erro ${resposta.status} ao fazer login.`);
    }

    await salvar(CHAVE_TOKEN, json.data.token);
    await salvar(CHAVE_CLIENTE, JSON.stringify(json.data.cliente));
    return json.data.cliente;
}

export async function pegarToken() {
    return ler(CHAVE_TOKEN);
}

export async function pegarCliente(): Promise<Cliente | null> {
    const dados = await ler(CHAVE_CLIENTE);
    return dados ? JSON.parse(dados) : null;
}

// Busca na API o cadastro completo de quem está logado (inclui a foto).
// Retorna null se não houver login ou se o token não valer mais.
export async function buscarClienteLogado(): Promise<Cliente | null> {
    const token = await pegarToken();
    if (!token) return null;

    const resposta = await fetch(`${API_BASE_URL}/api/v1/cliente`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!resposta.ok) return null;

    const json = await resposta.json();
    await salvar(CHAVE_CLIENTE, JSON.stringify(json.data));
    return json.data;
}

// Endereço da foto do cliente (as fotos ficam em davilla/images/cliente).
export function urlFotoCliente(cliente: Cliente | null) {
    if (!cliente?.foto_cliente) return null;
    return `${API_BASE_URL}/davilla/images/cliente/${encodeURIComponent(cliente.foto_cliente)}`;
}

// Apaga o token na API e no aparelho.
export async function fazerLogout() {
    const token = await pegarToken();
    if (token) {
        await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
            method: "POST",
            headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
        }).catch(() => {});
    }
    await apagar(CHAVE_TOKEN);
    await apagar(CHAVE_CLIENTE);
}
