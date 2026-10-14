import { pegarToken } from "@/utils/auth";
import { API_BASE_URL } from "@/utils/categorias";

export type Cupom = {
    codigo: string;
    percentual: number; // 10 = 10% de desconto
};

// Confere na API se o cupom existe, está ativo e dentro da validade.
// Se não valer, lança um erro com a mensagem da API para mostrar na tela.
export async function validarCupom(codigo: string): Promise<Cupom> {
    const token = await pegarToken();
    if (!token) throw new Error("Faça login novamente.");

    const resposta = await fetch(
        `${API_BASE_URL}/api/v1/cupons/${encodeURIComponent(codigo.trim())}`,
        { headers: { Accept: "application/json", Authorization: `Bearer ${token}` } }
    );

    const json = await resposta.json().catch(() => null);
    if (!resposta.ok || !json?.success) {
        throw new Error(json?.message ?? "Cupom inválido ou expirado.");
    }
    return { codigo: json.data.codigo, percentual: json.data.percentual };
}

// Desconto em reais sobre os produtos (a entrega não tem desconto).
// Mesmo arredondamento da API, para os valores baterem.
export function calcularDesconto(subtotal: number, cupom: Cupom | null) {
    if (!cupom) return 0;
    return Math.round(subtotal * cupom.percentual) / 100;
}
