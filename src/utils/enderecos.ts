import { buscarClienteLogado, pegarToken } from "@/utils/auth";
import { API_BASE_URL } from "@/utils/categorias";

export type Endereco = {
    id_endereco: number;
    nome_endereco: string;
    endereco: string;
    numero: string;
    complemento: string | null;
    bairro: string;
    cidade: string;
    uf: string;
    cep: string;
    principal_endereco: "SIM" | "NAO";
};

export type DadosEndereco = Omit<Endereco, "id_endereco" | "principal_endereco">;

// Endereço mostrado na Sacola e no Pagamento
export type EnderecoEntrega = {
    nome: string;
    texto: string;
    telefone: string;
};

// Chama a rota de endereços mandando o token de quem está logado.
async function chamarEnderecos(caminho: string, method = "GET", corpo?: object) {
    const token = await pegarToken();
    if (!token) throw new Error("Faça login novamente.");

    const resposta = await fetch(`${API_BASE_URL}/api/v1/enderecos${caminho}`, {
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
        throw new Error(json?.message ?? `Erro ${resposta.status} nos endereços.`);
    }
    return json;
}

// "Rua X, 10 - Sala 2\nBairro - Cidade - UF\nCEP: 00000-000"
export function formatarEndereco(endereco: Endereco) {
    const complemento = endereco.complemento ? ` - ${endereco.complemento}` : "";
    return `${endereco.endereco}, ${endereco.numero}${complemento}\n${endereco.bairro} - ${endereco.cidade} - ${endereco.uf}\nCEP: ${endereco.cep}`;
}

// Endereços ativos do cliente logado (o principal vem primeiro)
export async function buscarEnderecos(): Promise<Endereco[]> {
    return (await chamarEnderecos("")).data;
}

export async function buscarEndereco(id: number): Promise<Endereco> {
    return (await chamarEnderecos(`/${id}`)).data;
}

// Sem id cria um endereço novo; com id atualiza o existente.
export async function salvarEndereco(dados: DadosEndereco, id?: number): Promise<Endereco> {
    const json = id
        ? await chamarEnderecos(`/${id}`, "PUT", dados)
        : await chamarEnderecos("", "POST", dados);
    return json.data;
}

export async function tornarPrincipal(id: number) {
    await chamarEnderecos(`/${id}/principal`, "PATCH");
}

export async function excluirEndereco(id: number) {
    await chamarEnderecos(`/${id}`, "DELETE");
}

// Endereço de entrega: o principal cadastrado no app ou, se não houver,
// o endereço do cadastro do cliente.
export async function buscarEnderecoEntrega(): Promise<EnderecoEntrega | null> {
    const cliente = await buscarClienteLogado();
    if (!cliente) return null;

    const [principal] = await buscarEnderecos();
    if (principal) {
        return {
            nome: principal.nome_endereco,
            texto: formatarEndereco(principal).split("\n").slice(0, 2).join(" - "),
            telefone: cliente.telefone_cliente,
        };
    }

    if (!cliente.endereco_cliente) return null;
    return {
        nome: "Cadastro",
        texto: `${cliente.endereco_cliente}, ${cliente.numero_cliente} - ${cliente.bairro_cliente} - ${cliente.cidade_cliente} - ${cliente.uf_cliente}`,
        telefone: cliente.telefone_cliente,
    };
}
