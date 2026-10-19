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

    // Foto real do cliente: ocupa o círculo todo e não recebe cor
    fotoAvatar: {
        width: 54,
        height: 54,
        borderRadius: 27,
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

    txtErro: {
        color: "#d32f2f",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },

    txtSucesso: {
        color: cores.verde,
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },

    // Janelinha "Tirar foto / Escolher da galeria" (abre na parte de baixo da tela)
    modalFundo: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    modalCaixa: {
        width: '100%',
        maxWidth: 480,
        backgroundColor: cores.branco,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 30,
    },

    modalAlca: {
        width: 42,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#dddddd',
        alignSelf: 'center',
        marginBottom: 18,
    },

    modalTitulo: {
        fontSize: fontes.fontgrande,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    modalSubtitulo: {
        fontSize: 13,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 2,
        marginBottom: 18,
    },

    opcaoFoto: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fafafa',
        borderColor: '#eeeeee',
        borderWidth: 1,
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
    },

    opcaoFotoPressionada: {
        opacity: 0.6,
    },

    iconeOpcaoFoto: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    imgOpcaoFoto: {
        width: 22,
        height: 22,
        tintColor: cores.laranja,
    },

    infoOpcaoFoto: {
        flex: 1,
    },

    tituloOpcaoFoto: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: cores.preto,
    },

    descricaoOpcaoFoto: {
        fontSize: 12,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 1,
    },

    setaOpcaoFoto: {
        fontSize: 26,
        color: '#bbbbbb',
        marginLeft: 8,
    },

    btnCancelarFoto: {
        width: '100%',
        borderRadius: 14,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 6,
        backgroundColor: '#f2f2f2',
    },

    txtCancelarFoto: {
        fontSize: fontes.fontmedia,
        fontFamily: fontes.negrito,
        color: '#555555',
    },

});

export default editarPerfilStyle;
