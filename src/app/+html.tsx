import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

// HTML base da versão web (só roda no build, não no celular).
// lang="pt-BR" e translate="no" impedem o Chrome de traduzir o app:
// a tradução troca os textos da tela e o React deixa de atualizá-los
// (o preço ficava "R$ 0,00" e "Home" virava "Lar").
export default function Root({ children }: PropsWithChildren) {
    return (
        <html lang="pt-BR" translate="no">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <meta name="google" content="notranslate" />
                <ScrollViewStyleReset />
            </head>
            <body>{children}</body>
        </html>
    );
}
