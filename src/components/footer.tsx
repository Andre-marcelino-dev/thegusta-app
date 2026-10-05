import { router, usePathname } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import footerStyle from "@/styles/footerStyle";

const menuItens = [
    {
        id: 1,
        rotulo: "Home",
        icone: require("@/assets/images/img/home.png"),
        rota: "/home",
    },
    {
        id: 2,
        rotulo: "Cardápio",
        icone: require("@/assets/images/img/cardapio.png"),
        rota: "/cardapio",
    },
    {
        id: 3,
        rotulo: "Sacola",
        icone: require("@/assets/images/img/sacola.png"),
        rota: "/sacola",
    },
    {
        id: 4,
        rotulo: "Pedido",
        icone: require("@/assets/images/img/pedido.png"),
        rota: "/pedidos",
    },
    {
        id: 5,
        rotulo: "Config",
        icone: require("@/assets/images/img/config.png"),
        rota: "/configuracoes",
    },
];

export default function Footer() {
    // O item ativo é o da tela atual
    const rotaAtual = usePathname();

    return (
        <View style={footerStyle.menuInferior}>
            {menuItens.map((item) => {
                const ativo = rotaAtual === item.rota;
                return (
                    <Pressable
                        key={item.id}
                        style={footerStyle.itemMenu}
                        onPress={() => !ativo && router.push(item.rota as any)}
                    >
                        <Image
                            style={[footerStyle.imgMenu, ativo && footerStyle.imgMenuAtivo]}
                            source={item.icone}
                        />
                        <Text style={[footerStyle.txtMenu, ativo && footerStyle.txtMenuAtivo]}>
                            {item.rotulo}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
}
