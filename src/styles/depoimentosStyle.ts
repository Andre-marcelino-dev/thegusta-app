import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const depoimentosStyle = StyleSheet.create({

    header: {
        width: '80%',
        margin: "auto",
        marginTop: 60,
    },

    conteudo: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        width: '100%',
    },

    btnVoltar: {
        position: 'absolute',
        top: 50,
        left: '10%',
        zIndex: 9999,
        elevation: 20,
        width: 42,
        height: 42,
        borderRadius: "50%",
        backgroundColor: cores.laranja,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconeVoltar: {
        width: 20,
        height: 20,
        tintColor: cores.branco,
    },

    logo: {
        width: 55,
        height: 55,
        borderRadius: "50%",
    },

    titulo: {
        fontSize: 30,
        color: cores.laranja,
        textAlign: 'left',
        marginTop: 15,
        fontFamily: fontes.negrito,
        textDecorationLine: 'underline',
    },

    subtitulo: {
        marginTop: 10,
        fontSize: 15,
        color: cores.cinzclaro,
    },

    main: {
        width: '80%',
        margin: "auto",
        marginTop: 25,
    },

    cardNovo: {
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 18,
        marginBottom: 30,
    },

    tituloCardNovo: {
        fontSize: fontes.fontgrande,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginBottom: 16,
    },

    labelCampo: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginBottom: 8,
    },

    linhaEstrelas: {
        flexDirection: 'row',
        marginBottom: 20,
    },

    estrela: {
        fontSize: 26,
        color: cores.laranja,
        marginRight: 6,
    },

    estrelaVazia: {
        color: cores.laranjaclaro,
    },

    inputDepoimento: {
        width: '100%',
        minHeight: 90,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 12,
        padding: 12,
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
        textAlignVertical: 'top',
        marginBottom: 18,
    },

    btnEnviar: {
        width: '100%',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
    },

    txtEnviar: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

    tituloSecao: {
        fontSize: fontes.fontxg,
        color: cores.laranja,
        fontFamily: fontes.negrito,
        marginBottom: 16,
    },

    card: {
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },

    linhaEstrelasCard: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    estrelaCard: {
        fontSize: 18,
        color: cores.laranja,
        marginRight: 4,
    },

    txtAvaliacao: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
        lineHeight: 18,
    },

});

export default depoimentosStyle;
