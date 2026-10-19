import { pegarToken } from "@/utils/auth";
import { API_BASE_URL } from "@/utils/categorias";

export type Depoimento = {
    id: number;
    nota: number; // 1 a 5 estrelas
    texto: string;
    status: "PENDENTE" | "APROVADO" | "RECUSADO";
    situacao: string; // "Em análise", "Publicado" ou "Não publicado"
    criado_em: string;
};

async function cabecalhos() {
    const token = await pegarToken();
    if (!token) throw new Error("Faça login novamente.");
    return {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

// Depoimentos de quem está logado, do mais novo para o mais antigo
export async function buscarDepoimentos(): Promise<Depoimento[]> {
    const resposta = await fetch(`${API_BASE_URL}/api/v1/depoimentos`, {
        headers: await cabecalhos(),
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao buscar os depoimentos`);
    const json = await resposta.json();
    return json.data;
}

// Envia o depoimento. Ele chega "Em análise" e a loja aprova no painel.
export async function enviarDepoimento(nota: number, texto: string): Promise<string> {
    const resposta = await fetch(`${API_BASE_URL}/api/v1/depoimentos`, {
        method: "POST",
        headers: await cabecalhos(),
        body: JSON.stringify({ nota, texto: texto.trim() }),
    });

    const json = await resposta.json().catch(() => null);
    if (resposta.status === 429) throw new Error("Muitos envios seguidos. Aguarde um minuto.");
    if (!resposta.ok || !json?.success) {
        const primeiroErro = json?.errors
            ? Object.values(json.errors as Record<string, string[]>)[0]?.[0]
            : null;
        throw new Error(primeiroErro ?? json?.message ?? "Não foi possível enviar o depoimento.");
    }
    return json.message;
}
