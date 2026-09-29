import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const editarEnderecoStyle = StyleSheet.create({

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

    form: {
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 18,
        marginBottom: 20,
    },

    campo: {
        width: '100%',
        marginBottom: 16,
    },

    linhaLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },

    iconeCampo: {
        width: 16,
        height: 16,
        tintColor: cores.laranja,
        marginRight: 8,
    },

    labelCampo: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    inputCampo: {
        width: '100%',
        borderBottomColor: cores.laranjaclaro,
        borderBottomWidth: 2,
        paddingBottom: 8,
        paddingLeft: 24,
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
    },

    btnSalvar: {
        width: '100%',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 12,
    },

    txtSalvar: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

    btnCancelar: {
        width: '100%',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
    },

    txtCancelar: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

});

export default editarEnderecoStyle;
