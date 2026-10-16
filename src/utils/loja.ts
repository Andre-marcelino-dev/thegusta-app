import { useEffect, useState } from "react";

import { API_BASE_URL } from "@/utils/categorias";

export type ConfiguracoesLoja = {
    taxaEntrega: number;
    previsaoEntrega: string;
};

// Usado enquanto a API carrega ou se ela falhar
const PADRAO: ConfiguracoesLoja = { taxaEntrega: 6, previsaoEntrega: "45 - 60 min" };

// Última resposta da API, para as telas abrirem já com o valor certo
let ultimaConfiguracao: ConfiguracoesLoja | null = null;

// Taxa e previsão de entrega definidas no painel admin (Sistema → Configurações da loja)
export async function buscarConfiguracoes(): Promise<ConfiguracoesLoja> {
    const resposta = await fetch(`${API_BASE_URL}/api/v1/configuracoes`, {
        headers: { Accept: "application/json" },
    });
    if (!resposta.ok) throw new Error(`Erro ${resposta.status} ao buscar as configurações`);

    const json = await resposta.json();
    ultimaConfiguracao = {
        taxaEntrega: Number(json.data.taxa_entrega),
        previsaoEntrega: json.data.previsao_entrega,
    };
    return ultimaConfiguracao;
}

// Hook para as telas: devolve a configuração e busca a versão mais nova ao abrir
export function useConfiguracoes(): ConfiguracoesLoja {
    const [config, setConfig] = useState<ConfiguracoesLoja>(ultimaConfiguracao ?? PADRAO);

    useEffect(() => {
        buscarConfiguracoes()
            .then(setConfig)
            .catch((erro) => console.error("Erro ao carregar configurações:", erro));
    }, []);

    return config;
}
