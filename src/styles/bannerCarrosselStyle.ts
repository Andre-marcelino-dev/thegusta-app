import { StyleSheet } from "react-native"
import { cores } from "./variaveis";

const bannerCarrosselStyle = StyleSheet.create({

    container: {
        width: '100%',
        marginTop: 30,
        borderRadius: 20,
        overflow: 'hidden',
    },

    imagem: {
        height: 160,
    },

    indicadores: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },

    bolinha: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: cores.branco,
        opacity: 0.6,
    },

    bolinhaAtiva: {
        width: 20,
        backgroundColor: cores.laranja,
        opacity: 1,
    },

});

export default bannerCarrosselStyle;
