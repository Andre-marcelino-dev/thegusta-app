import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const configuracoesStyle = StyleSheet.create({

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

    cardUsuario: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        marginBottom: 25,
    },

    avatarUsuario: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    imgAvatarUsuario: {
        width: 24,
        height: 24,
        tintColor: cores.laranja,
    },

    infoUsuario: {
        flex: 1,
    },

    nomeUsuario: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    descricaoUsuario: {
        fontSize: 12,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 2,
    },

    tituloSecao: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginBottom: 12,
    },

    itemConta: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
    },

    iconeCaixaItem: {
        width: 38,
        height: 38,
        borderRadius: 10,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    imgItem: {
        width: 20,
        height: 20,
        tintColor: cores.laranja,
    },

    infoItem: {
        flex: 1,
    },

    tituloItem: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    descricaoItem: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 2,
    },

    txtSeta: {
        fontSize: 18,
        fontFamily: fontes.negrito,
        color: cores.laranja,
        marginLeft: 8,
    },

    btnInstalar: {
        backgroundColor: cores.laranja,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },

    txtBtnInstalar: {
        fontSize: 12,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

    btnToggle: {
        marginLeft: 8,
    },

    imgToggle: {
        width: 44,
        height: 26,
    },

    secao: {
        marginBottom: 10,
    },

    btnSair: {
        width: '100%',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    txtSair: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

});

export default configuracoesStyle;
