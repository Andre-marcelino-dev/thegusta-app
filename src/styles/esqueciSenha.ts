import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes} from "./variaveis";

const loginStyle = StyleSheet.create({
    conteudo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },

    logo: {
        width: 195,
        height: 180,
    },

    titulo: {
        marginTop: 30,
        fontSize: fontes.fontxgrande,
        fontWeight: 'bold',
        color: cores.preto,
        textAlign: 'center',
    },

    subtitulo: {
        margin: 10,
        fontSize: fontes.fontgrande,
        color: cores.cinzclaro,
    },

    form: {
        width: '100%',
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: '5%',
    },

    input: {
        height: 50,
        flexDirection: 'row',
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        width: '100%',
        marginVertical: 10,
        justifyContent: 'space-between',

    },

    icone: {
        width: 30,
        height: 30,
        marginRight: 10,
    },

    textInput: {
        width: '100%',
    },

    mostrarSenha: {
        width: 20,
        height: 20,
        marginVertical: 5,
    },

    btnMostrarSenha: {
        justifyContent: 'center',
    },

    btnEsqueciSenha: {
        alignSelf: 'flex-end',

    },

    txtEsqueciSenha: {
        fontSize: 12,
        color: '#ff98001',
        textDecorationLine: 'underline',
    },

    btnEntrar: {
        width: '80%',
        height: 50,
        backgroundColor: cores.laranja,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor:cores.preto,
        borderWidth:2,
        marginTop: 20,
        alignItems: 'center',
    },

    textoEntrar: {
        fontSize: fontes.fonttitulo,
        color: cores.preto,
        fontWeight: 'bold',
    },

    btnEntrarPressed: {
        opacity: 0.8,
    },

    separador: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginVertical: 10,
    },

    linha: {
        flex: 1,
        height: 2,
        backgroundColor: cores.laranja,
    },

    textoSeparador: {
        fontSize: fontes.fontmedia,
        color: '#888888',

    },

    btnTenhoConta: {
        width: '80%',
        height: 50,
        backgroundColor: cores.laranjaclaro,
        justifyContent: 'center',
        borderRadius: 10,
        borderColor:cores.laranja,
        borderWidth:2,
        alignItems: 'center',
        margin:10,

    },

    btnCriarContaPressed:{
         backgroundColor:cores.laranja,

    }


});

export default loginStyle;