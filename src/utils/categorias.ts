import { SERVIDOR } from "@/config/api";

// O endereço do servidor fica só no config/api.ts
export const API_BASE_URL = SERVIDOR;

export type Categoria = {
    id: number;
    nome: string;
    icone: any;
};

type CategoriaApi = {
    id_categoria: number;
    nome_categoria: string;
    status_categoria: "ATIVO" | "INATIVO";
    ordem_categoria: number;
};

// A API não retorna ícone, então escolhemos um localmente pelo nome da categoria.
export function escolherIconeCategoria(nomeCategoria: string) {
    const nome = nomeCategoria.toLowerCase();
    if (nome.includes("bolo")) return require("@/assets/images/img/bolo.png");
    if (nome.includes("doce") || nome.includes("brigadeiro"))
        return require("@/assets/images/img/brigadeiro.png");
    if (nome.includes("torta")) return require("@/assets/images/img/torta.png");
    if (nome.includes("bebida"))
        return require("@/assets/images/img/copo-de-plastico.png");
    if (nome.includes("kit") || nome.includes("presente"))
        return require("@/assets/images/img/presente-de-supermercado.png");
    return require("@/assets/images/img/cardapio.png");
}

// Busca as categorias ativas no banco, já ordenadas pela ordem_categoria.
export async function buscarCategorias(): Promise<Categoria[]> {
    const resposta = await fetch(`${API_BASE_URL}/api/v1/categorias`);
    if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status} ao buscar categorias`);
    }
    const json = await resposta.json();
    return json.data
        .filter((categoria: CategoriaApi) => categoria.status_categoria === "ATIVO")
        .sort(
            (a: CategoriaApi, b: CategoriaApi) => a.ordem_categoria - b.ordem_categoria
        )
        .map((categoria: CategoriaApi) => ({
            id: categoria.id_categoria,
            nome: categoria.nome_categoria,
            icone: escolherIconeCategoria(categoria.nome_categoria),
        }));
}
