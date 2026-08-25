import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const produtoStyle = StyleSheet.create({

    header: {
        width: '80%',
        margin: "auto",
        marginTop: 60,
    },

    topo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    btnTopo: {
        width: 44,
        height: 44,
        borderRadius: "50%",
        borderColor: cores.laranja,
        borderWidth: 2,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconeTopo: {
        width: 20,
        height: 20,
        tintColor: cores.laranja,
    },

    txtFavorito: {
        fontSize: 20,
        color: cores.laranja,
    },

    main: {
        width: '80%',
        margin: "auto",
        marginTop: 20,
    },

    imgProduto: {
        width: '100%',
        height: 220,
        borderRadius: 25,
    },

    conteudoTitulo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
    },

    titulo: {
        fontSize: fontes.fontxg,
        fontFamily: fontes.negrito,
        color: cores.preto,
        flexShrink: 1,
    },

    categoria: {
        fontSize: fontes.fontpeq,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        backgroundColor: cores.laranjaclaro,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        overflow: 'hidden',
    },

    preco: {
        fontSize: fontes.fontxg,
        fontFamily: fontes.negrito,
        color: cores.laranja,
        marginTop: 10,
    },

    textoResumo: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        lineHeight: 22,
        marginTop: 15,
    },

    tituloSecao: {
        fontSize: fontes.fontgrande,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginTop: 25,
        marginBottom: 10,
    },

    textoDescricao: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        lineHeight: 22,
        marginBottom: 20,
    },

    rodapeCompra: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: cores.branco,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: cores.preto,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },

    quantidade: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
    },

    btnQuantidade: {
        width: 34,
        height: 34,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtBtnQuantidade: {
        fontSize: 18,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    txtQuantidade: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
          color: cores.cinzclaro,
        minWidth: 20,
        textAlign: 'center',
    },

    subtotal: {
        alignItems: 'flex-start',
    },

    txtSubtotalLabel: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
    },

    txtSubtotalValor: {
        fontSize: fontes.fontgrande,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    btnAdicionarSacola: {
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingHorizontal: 20,
        paddingVertical: 14,

    },

    txtAdicionarSacola: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
        fontWeight: 'bold',
    },

    menuInferior: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 15,
        backgroundColor: cores.branco,
        shadowColor: cores.preto,
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 6,
    },

    itemMenu: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgMenu: {
        width: 26,
        height: 26,
    },

    txtMenu: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.laranja,
        marginTop: 4,
    },

});

export default produtoStyle;
