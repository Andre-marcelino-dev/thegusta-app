import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const editarPerfilStyle = StyleSheet.create({

    header: {
        width: '80%',
        margin: "auto",
        marginTop: 60,
    },

    conteudo: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
    },

    btnVoltar: {
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

    cardFoto: {
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },

    linhaFoto: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    avatarFoto: {
        width: 54,
        height: 54,
        borderRadius: 27,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgAvatarFoto: {
        width: 28,
        height: 28,
        tintColor: cores.laranja,
    },

    btnAlterarFoto: {
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    txtAlterarFoto: {
        fontSize: 12,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    txtDescricaoFoto: {
        fontSize: 12,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 12,
    },

    form: {
        width: '100%',
        marginBottom: 20,
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
        marginBottom: 14,
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

    cardNotificacao: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 12,
        padding: 14,
        marginBottom: 25,
    },

    iconeCaixaNotificacao: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    imgIconeNotificacao: {
        width: 20,
        height: 20,
        tintColor: cores.laranja,
    },

    infoNotificacao: {
        flex: 1,
    },

    tituloNotificacao: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    descricaoNotificacao: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 2,
    },

    imgToggle: {
        width: 44,
        height: 26,
        marginLeft: 8,
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

export default editarPerfilStyle;
