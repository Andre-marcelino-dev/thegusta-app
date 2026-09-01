import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const pagamentoStyle = StyleSheet.create({

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

    labelCard: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    txtAlterar: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.laranja,
        textDecorationLine: 'underline',
    },

    txtEnderecoTitulo: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
        marginTop: 8,
    },

    txtEndereco: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 4,
        lineHeight: 18,
    },

    linhaEntregaRetirada: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    segmentado: {
        flexDirection: 'row',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
    },

    segmentoItem: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },

    segmentoItemAtivo: {
        backgroundColor: cores.laranja,
    },

    txtSegmento: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    txtSegmentoAtivo: {
        color: cores.branco,
    },

    previsao: {
        alignItems: 'flex-end',
    },

    txtPrevisaoValor: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    txtPrevisaoLabel: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 2,
    },

    segmentado3: {
        flexDirection: 'row',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,
    },

    segmentoItem3: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

    linhaObservacao: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconeObservacao: {
        width: 18,
        height: 18,
        marginRight: 8,
        tintColor: cores.laranja,
    },

    inputObservacao: {
        width: '100%',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        minHeight: 50,
        fontSize: 13,
        color: cores.preto,
        fontFamily: fontes.comum,
        textAlignVertical: 'top',
    },

    iconeResumo: {
        width: 20,
        height: 20,
        marginRight: 8,
        tintColor: cores.laranja,
    },

    itemResumo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
    },

    linhaItemResumo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    imgItemResumo: {
        width: 22,
        height: 22,
        borderRadius: 6,
        marginRight: 10,
    },

    txtItemResumo: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.preto,
        flexShrink: 1,
    },

    txtValorItemResumo: {
        fontSize: 13,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    divisor: {
        width: '100%',
        height: 1,
        backgroundColor: cores.laranja,
        marginVertical: 12,
    },

    linhaResumo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },

    txtLabelResumo: {
        fontSize: 14,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    txtValorResumo: {
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

    btnConfirmar: {
        width: '80%',
        alignSelf: 'center',
        backgroundColor: cores.laranja,
        borderRadius: 15,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 20,
    },

    txtConfirmar: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.branco,
    },

});

export default pagamentoStyle;
