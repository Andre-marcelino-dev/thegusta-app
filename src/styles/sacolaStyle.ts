import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const sacolaStyle = StyleSheet.create({

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
        marginTop:10,
    },

    iconeVoltar: {
        width: 36,
        height: 36,
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
        marginTop: 15,
    },

    tituloSecao: {
        fontSize: fontes.fontgrande,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginBottom: 12,
    },

    cardItem: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: cores.branco,
        borderRadius: 15,
        padding: 10,
        marginBottom: 15,
        shadowColor: cores.preto,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    imgItem: {
        width: '27%',
        height: 50,
        borderRadius: 12,
        marginTop:20
    },

    infoItem: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'space-between',
    },

    topoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    infoTexto: {
        flex: 1,
        marginRight: 8,
    },

    nomeItem: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    descricaoItem: {
        fontSize: 15,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 2,
        width: '100%',
    },

    btnLixeira: {
        flexShrink: 0,
    },

    imgLixeira: {
        width: 18,
        height: 18,
        tintColor: cores.cinzclaro,
    },

    rodapeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },

    precos: {
        flexDirection: 'row',
        alignItems: 'baseline',
        flexShrink: 1,
    },

    precoUnitario: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginRight: 10,
    },

    precoItem: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    quantidade: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 0,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 8,
    },

    btnQuantidade: {
        width: 26,
        height: 26,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtBtnQuantidade: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    txtQuantidade: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.cinzclaro,
        minWidth: 16,
        textAlign: 'center',
    },

    cupom: {
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
        textTransform:'uppercase',
    },

    tituloCupom: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginBottom: 10,
    },

    conteudoCupom: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    inputCupom: {
        flex: 1,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        height: 42,
        paddingHorizontal: 12,
        fontSize: 13,
        color: cores.preto,
        fontFamily: fontes.comum,
    },

    btnCupom: {
        backgroundColor: cores.laranja,
        borderRadius: 10,
        height: 42,
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },

    txtBtnCupom: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

    cardEntrega: {
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },

    cardResumo: {
        width: '100%',
        backgroundColor: cores.branco,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },

    labelEntregaEm: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    linhaEndereco: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 8,
        marginVertical:5,
    },

    txtEndereco: {
        flex: 1,
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginBottom:5,
    },

    txtTelefone: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
    
        marginLeft: 56,
    },

    linhaRodapeEntrega: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },

    iconeEntrega: {
        width: 50,
        height: 50,
        marginRight: 8,
    },

    txtPrevisaoLabel: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
    },

    txtPrevisaoValor: {
        flex: 1,
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
        textAlign: 'center',
    },

    txtTrocarEndereco: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.laranja,
        textDecorationLine: 'underline',
    },

    divisor: {
        width: '100%',
        height: 2,
        backgroundColor: cores.laranja,
        marginVertical: 5,
    },

    linhaResumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
        width:'100%',
    },

    txtLabelResumo: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    txtLabelDesconto: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.verde,
    },

    txtCodigoCupom: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.verde,
        textAlign:'center',
        justifyContent:'center',
    },

    txtValorResumo: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    txtValorDesconto: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.verde,
    },

    txtLabelTotal: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    txtValorTotal: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.laranja,
   
    },

    btnFinalizar: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
        marginBottom: 20,
    },

    txtFinalizar: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

});

export default sacolaStyle;
