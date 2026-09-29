import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const faleConoscoStyle = StyleSheet.create({

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
        color: cores.preto,
        textAlign: 'left',
        marginTop: 15,
        fontFamily: fontes.negrito,
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

    campo: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 14,
        height: 52,
        marginBottom: 16,
    },

    iconeCampo: {
        width: 20,
        height: 20,
        tintColor: cores.laranja,
        marginRight: 10,
    },

    inputCampo: {
        flex: 1,
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
    },

    campoMensagem: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 14,
        marginBottom: 20,
    },

    iconeMensagem: {
        width: 20,
        height: 20,
        tintColor: cores.laranja,
        marginRight: 10,
        marginTop: 2,
    },

    inputMensagem: {
        flex: 1,
        minHeight: 140,
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
        textAlignVertical: 'top',
    },

    btnEnviar: {
        width: '100%',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 25,
    },

    txtEnviar: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

    cardAtendimento: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 18,
        marginBottom: 25,
    },

    infoAtendimento: {
        flex: 1,
    },

    tituloAtendimento: {
        fontSize: fontes.fontgrande,
        fontFamily: fontes.negrito,
        color: cores.laranja,
        marginBottom: 12,
    },

    txtValor: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
        marginBottom: 12,
    },

    txtLabel: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    iconeCaixaAtendimento: {
        width: 46,
        height: 46,
        borderRadius: 12,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },

    imgIconeAtendimento: {
        width: 24,
        height: 24,
        tintColor: cores.laranja,
    },

});

export default faleConoscoStyle;
