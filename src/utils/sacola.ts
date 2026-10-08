import { pegarToken } from "@/utils/auth";
import { API_BASE_URL } from "@/utils/categorias";

export type ItemSacola = {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    imagem: any;
};

type ItemSacolaApi = {
    id_sacola: number;
    qtde_sacola: number;
    produto: {
        nome_produto: string;
        descricao_produto: string;
        valor_produto: number;
        foto_produto: string;
    };
};

// Chama a rota da sacola mandando o token de quem está logado.
async function chamarSacola(caminho: string, method = "GET", corpo?: object) {
    const token = await pegarToken();
    if (!token) throw new Error("Cliente não está logado.");

    const resposta = await fetch(`${API_BASE_URL}/api/v1/sacola${caminho}`, {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: corpo ? JSON.stringify(corpo) : undefined,
    });

    const json = await resposta.json().catch(() => null);
    if (!resposta.ok || !json?.success) {
        throw new Error(json?.message ?? `Erro ${resposta.status} na sacola.`);
    }
    return json;
}

// Busca no banco os itens que o cliente logado colocou na sacola.
export async function buscarSacola(): Promise<ItemSacola[]> {
    const json = await chamarSacola("");
    return json.data.map((item: ItemSacolaApi) => ({
        id: item.id_sacola,
        nome: item.produto.nome_produto,
        descricao: item.produto.descricao_produto,
        preco: item.produto.valor_produto,
        quantidade: item.qtde_sacola,
        imagem: { uri: `${API_BASE_URL}/davilla/images/${item.produto.foto_produto}` },
    }));
}

// Se o produto já estiver na sacola, a API soma a quantidade.
export async function adicionarNaSacola(idProduto: number, quantidade: number) {
    await chamarSacola("", "POST", { id_produto: idProduto, quantidade });
}

export async function alterarQuantidadeSacola(id: number, quantidade: number) {
    await chamarSacola(`/${id}`, "PATCH", { quantidade });
}

export async function removerDaSacola(id: number) {
    await chamarSacola(`/${id}`, "DELETE");
}
