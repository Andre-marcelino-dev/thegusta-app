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
    zIndex: -2, // valor negativo joga para trás dos elementos "normais"
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
        alignItems: 'center',
        marginTop: 20,
    },

    titulo: {
        flex: 1,
        fontSize: fontes.fontgrande,
        fontFamily: fontes.negrito,
        color: cores.preto,
        textAlign: 'center',
        marginHorizontal: 10,
        paddingTop: 10,
    },

    categoria: {
        fontSize: fontes.fontpeq,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
    },

    preco: {
        fontSize: fontes.fontxg,
        fontFamily: fontes.negrito,
        color: cores.laranja,
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
        marginBottom: 40,
    },

    rodapeCompra: {
        width: '100%',
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

    linhaRodape: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
    },

    quantidade: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 10,
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
        flexDirection: 'row',
        alignItems: 'baseline',
    },

    txtSubtotalLabel: {
        fontSize: fontes.fontgrande,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginRight: 6,
    },

    txtSubtotalValor: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    btnAdicionarSacola: {
        width: '50%',
        alignSelf: 'center',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtAdicionarSacola: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

});

export default produtoStyle;
