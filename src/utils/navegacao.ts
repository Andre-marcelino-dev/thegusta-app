import { Href, router } from "expo-router";

// Volta para a tela anterior. Se a tela foi aberta direto (ex.: página
// recarregada no navegador), não há tela anterior e o router.back() não faz
// nada; nesse caso vai para a tela "mãe" informada.
export function voltar(telaMae: Href) {
    if (router.canGoBack()) router.back();
    else router.replace(telaMae);
}
