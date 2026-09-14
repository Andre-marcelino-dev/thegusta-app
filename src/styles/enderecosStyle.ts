import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const enderecosStyle = StyleSheet.create({

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

    card: {
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },

    linhaTopoCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    linhaTipo: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconeCaixaTipo: {
        width: 34,
        height: 34,
        borderRadius: 9,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    imgTipo: {
        width: 18,
        height: 18,
        tintColor: cores.laranja,
    },

    txtTipo: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    btnFavorito: {
        padding: 2,
    },

    imgFavorito: {
        width: 22,
        height: 22,
        tintColor: cores.cinzclaro,
    },

    imgFavoritoAtivo: {
        tintColor: cores.laranja,
    },

    txtEndereco: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
        marginTop: 10,
        marginLeft: 44,
        lineHeight: 18,
    },

    linhaStatus: {
        alignItems: 'flex-end',
        marginTop: 10,
    },

    pillAtivo: {
        backgroundColor: '#d9f2df',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 12,
    },

    txtPillAtivo: {
        fontSize: 11,
        fontFamily: fontes.negrito,
        color: cores.verde,
    },

    txtUsarEndereco: {
        fontSize: 12,
        fontFamily: fontes.negrito,
        color: cores.laranja,
        textDecorationLine: 'underline',
    },

    linhaBotoes: {
        flexDirection: 'row',
        marginTop: 14,
    },

    btnEditar: {
        flex: 1,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 9,
        alignItems: 'center',
        marginRight: 10,
    },

    txtEditar: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    btnExcluir: {
        flex: 1,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        paddingVertical: 9,
        alignItems: 'center',
    },

    txtExcluir: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    btnAdicionar: {
        width: '100%',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 12,
    },

    txtAdicionar: {
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

export default enderecosStyle;
