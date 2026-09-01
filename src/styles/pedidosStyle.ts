import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const pedidosStyle = StyleSheet.create({

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

    abas: {
        flexDirection: 'row',
        backgroundColor: cores.laranjaclaro,
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
    },

    aba: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    abaAtiva: {
        backgroundColor: cores.laranja,
    },

    txtAba: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    txtAbaAtiva: {
        color: cores.branco,
    },

    cardPedido: {
        width: '100%',
        backgroundColor: cores.branco,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
        shadowColor: cores.preto,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    topoPedido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    linhaNumeroPedido: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconeCaixaPedido: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    imgPedido: {
        width: 18,
        height: 18,
        tintColor: cores.laranja,
    },

    txtNumeroPedido: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    linhaStatus: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    imgStatus: {
        width: 16,
        height: 16,
        marginRight: 4,
    },

    txtStatus: {
        fontSize: 12,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    listaItens: {
        marginTop: 12,
    },

    linhaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },

    imgItem: {
        width: 24,
        height: 24,
        borderRadius: 6,
        marginRight: 10,
    },

    txtItem: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
    },

    divisor: {
        width: '100%',
        height: 1,
        backgroundColor: cores.laranjaclaro,
        marginVertical: 8,
    },

    rodapePedido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 15,
    },

    txtLabelTotal: {
        fontSize: 12,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
    },

    txtValorTotal: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.laranja,
        marginTop: 2,
    },

    previsao: {
        alignItems: 'flex-end',
    },

    linhaPrevisao: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    imgPrevisao: {
        width: 14,
        height: 14,
        marginRight: 4,
        tintColor: cores.laranja,
    },

    txtValorPrevisao: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    txtLabelPrevisao: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 2,
    },

    btnDetalhes: {
        width: '100%',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 12,
        paddingVertical: 10,
        alignItems: 'center',
    },

    txtDetalhes: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

});

export default pedidosStyle;
