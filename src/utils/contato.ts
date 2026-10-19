import { pegarToken } from "@/utils/auth";
import { API_BASE_URL } from "@/utils/categorias";

// Envia a mensagem do "Fale conosco". Nome, e-mail e telefone a API pega do cadastro.
// A mensagem aparece no painel em Mensagens de contato e a loja recebe um aviso por e-mail.
export async function enviarMensagemContato(assunto: string, mensagem: string): Promise<string> {
    const token = await pegarToken();
    if (!token) throw new Error("Faça login novamente.");

    const resposta = await fetch(`${API_BASE_URL}/api/v1/contato`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ assunto: assunto.trim(), mensagem: mensagem.trim() }),
    });

    const json = await resposta.json().catch(() => null);
    if (resposta.status === 429) throw new Error("Muitas mensagens seguidas. Aguarde um minuto.");
    if (!resposta.ok || !json?.success) {
        const primeiroErro = json?.errors
            ? Object.values(json.errors as Record<string, string[]>)[0]?.[0]
            : null;
        throw new Error(primeiroErro ?? json?.message ?? "Não foi possível enviar a mensagem.");
    }
    return json.message;
}
