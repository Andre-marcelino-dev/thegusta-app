import { pegarToken } from "@/utils/auth";
import { API_BASE_URL } from "@/utils/categorias";

// Taxa de entrega do cliente logado, pela zona do endereço principal dele
// (painel → Sistema → Zonas de entrega). É o mesmo valor que a API cobra no pedido.
export type EntregaCliente = {
    entregamos: boolean; // false = o endereço está fora da área de entrega
    taxaEntrega: number;
    previsaoEntrega: string;
    zona: string | null; // "Zona 1"; null quando a API usou a taxa padrão
};

export async function buscarEntregaCliente(): Promise<EntregaCliente> {
    const token = await pegarToken();
    if (!token) throw new Error("Faça login novamente.");

    const resposta = await fetch(`${API_BASE_URL}/api/v1/entrega/minha`, {
        headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
    });

    const json = await resposta.json().catch(() => null);
    if (!resposta.ok || !json?.success) {
        throw new Error(json?.message ?? `Erro ${resposta.status} ao buscar a taxa de entrega.`);
    }

    return {
        entregamos: json.data.entregamos,
        taxaEntrega: Number(json.data.taxa_entrega),
        previsaoEntrega: json.data.previsao,
        zona: json.data.zona?.nome ?? null,
    };
}
