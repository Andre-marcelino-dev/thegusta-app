import { pegarToken } from "@/utils/auth";
import { API_BASE_URL } from "@/utils/categorias";

export type ItemPedido = {
    id: number;
    nome: string;
    preco: number;
    imagem: any;
};

export type Pedido = {
    numero: number;
    data: string;
    status: string;
    formaPagamento: string;
    observacao: string;
    cupom: string | null;
    desconto: number;
    total: number;
    itens: ItemPedido[];
};

type PedidoApi = {
    id_venda: number;
    data_venda: string;
    valor_venda: number;
    status_venda: string;
    forma_pagamento_venda: string | null;
    observacao_venda: string | null;
    valor_desconto_venda: number;
    cupom: { codigo_cupom: string } | null;
    itens: {
        id_item: number;
        valor_unit_item: number;
        qtde_item: number;
        produto: { nome_produto: string; foto_produto: string };
    }[];
};

// Chama a rota de pedidos mandando o token de quem está logado.
async function chamarPedidos(caminho: string) {
    const token = await pegarToken();
    if (!token) throw new Error("Cliente não está logado.");

    const resposta = await fetch(`${API_BASE_URL}/api/v1/pedidos${caminho}`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    const json = await resposta.json().catch(() => null);
    if (!resposta.ok || !json?.success) {
        throw new Error(json?.message ?? `Erro ${resposta.status} ao buscar pedidos.`);
    }
    return json;
}

// A data vem do banco no horário da loja; lemos os números direto
// para o fuso do aparelho não mudar a hora.
function formatarData(dataApi: string) {
    const [ano, mes, dia, hora, minuto] = dataApi.match(/\d+/g)!.map(Number);
    const data = new Date(ano, mes - 1, dia);
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const ontem = new Date(hoje);
    ontem.setDate(hoje.getDate() - 1);

    const horario = `${String(hora).padStart(2, "0")}:${String(minuto).padStart(2, "0")}`;
    if (data.getTime() === hoje.getTime()) return `Hoje, ${horario}`;
    if (data.getTime() === ontem.getTime()) return `Ontem, ${horario}`;
    return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${ano}, ${horario}`;
}

function converterPedido(pedido: PedidoApi): Pedido {
    return {
        numero: pedido.id_venda,
        data: formatarData(pedido.data_venda),
        status: pedido.status_venda,
        formaPagamento: pedido.forma_pagamento_venda ?? "Não informado",
        observacao: pedido.observacao_venda || "Nenhuma observação para seu pedido",
        cupom: pedido.cupom?.codigo_cupom ?? null,
        desconto: pedido.valor_desconto_venda,
        total: pedido.valor_venda,
        itens: pedido.itens.map((item) => ({
            id: item.id_item,
            nome: `${item.qtde_item}x ${item.produto.nome_produto}`,
            preco: item.valor_unit_item * item.qtde_item,
            imagem: { uri: `${API_BASE_URL}/davilla/images/${item.produto.foto_produto}` },
        })),
    };
}

// Descobre em qual etapa o pedido está pelo status_venda do banco.
// 0 = cancelado, 1 = aguardando, 2 = em preparo, 3 = a caminho, 5 = entregue.
export function etapaDoStatus(status: string) {
    const valor = status.toUpperCase();
    if (valor.startsWith("CANCELAD")) return 0;
    if (valor.startsWith("AGUARD")) return 1;
    if (valor.startsWith("FINALIZAD") || valor.startsWith("ENTREGUE")) return 5;
    if (valor.includes("SAIU") || valor.includes("ENTREGA") || valor.includes("CAMINHO")) return 3;
    return 2;
}

export function textoDoStatus(etapa: number) {
    if (etapa === 0) return "Cancelado";
    if (etapa === 1) return "Aguardando";
    if (etapa === 3) return "Saiu para entrega";
    if (etapa === 5) return "Entregue";
    return "Em preparo";
}

// Busca no banco os pedidos do cliente logado (o mais novo primeiro).
export async function buscarPedidos(): Promise<Pedido[]> {
    const json = await chamarPedidos("");
    return json.data.map(converterPedido);
}

// Busca um pedido pelo número. Sem número, traz o pedido mais recente.
export async function buscarPedido(numero?: number): Promise<Pedido | null> {
    if (!numero) return (await buscarPedidos())[0] ?? null;
    const json = await chamarPedidos(`/${numero}`);
    return converterPedido(json.data);
}
