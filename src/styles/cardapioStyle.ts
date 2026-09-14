import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const cardapioStyle = StyleSheet.create({

    header: {
        width: '80%',
        margin: "auto",
        marginTop: 30,
    },
    conteudo: {
        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
        width: '100%',
        
        
    },
    btnVoltarFixo: {
        position: 'absolute',
        top: 50,
        left: '10%',
        zIndex: 9999,
        elevation: 20,
    },
    iconeVoltar: {
        width: 40,
        height: 40,
        backgroundColor: cores.laranjaclaro,
        borderRadius: '50%',
   
    },
    logo: {
        width: 80,
        height: 75,
       
        
    },
    titulo: {
        
        fontSize: 30,
        fontWeight: "bold",
        color: cores.preto,
        textAlign: "left",
        marginTop: 15,
        fontFamily: fontes.negrito
    },
    
    
    subtitulo: {
        marginTop: 10,
        fontSize: 18,
        color: cores.cinzclaro
    },
    main: {
        width: '80%',
        margin: "auto",
        marginTop: 30,
    },
    buscaPoduto: {
        width: '100%',
        height: 50,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        flexDirection: 'row'
        
        
    },
    
    txtProduto: {
        marginVertical: 'auto',
        color: cores.preto,
        fontSize: 15,
        width: '100%',
        
    },
    btnBuscar: {
        width: 30,
        height: 30,
        backgroundColor: cores.laranjaclaro,
        
        
    },
    
    imgBuscar: {
        
    },
    banner: {
        width: '100%',
        height: 160,
        borderRadius: 20,
        marginTop: 30,
        
    },
    
    tituloCategoria: {
        fontSize: 30,
        fontWeight: "bold",
        color: cores.preto,
        
        fontFamily: fontes.negrito,
        margin: 20,
    },
    
    categoria: {
        width: '100%',
        marginTop: 30,
        
    },
    conteudoCategoria: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,

    },

    tituloSecao: {
        fontSize: 30,
        color: cores.preto,
        fontFamily: fontes.negrito,

    },

    itemCategoria: {
        width: 55,
        height: 55,
        borderRadius: 10,
        borderColor: cores.laranja,
        borderWidth: 2,
        paddingVertical: 8,
        paddingHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: cores.laranjaclaro,
    },

    imgCategoria: {
        width: 26,
        height: 26,

    },

    txtCategoria: {
        fontSize: 11,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        marginTop: 6,
        textAlign: 'center',

    },

    destaque: {
        width: '100%',
        marginTop: 10,
    },

    listaDestaque: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },

    cardDestaque: {
        width: '47%',

        marginBottom: 20,
        backgroundColor: cores.branco,
        borderRadius: 15,
        padding: 6,
        shadowColor: cores.preto,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
       
    },

    wrapperImgDestaque: {
        width: '100%',
    },

    imgDestaque: {
        width: '100%',
        height: 110,
        borderRadius: 12,
    },

    badgeDestaque: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 22,
        height: 22,
        borderRadius: 8,
        borderColor: cores.laranja,
        borderWidth: 1.5,
        backgroundColor: cores.laranjaclaro,
        alignItems: 'center',
        justifyContent: 'center',
    },

    txtEstrela: {
        fontSize: 12,
        color: cores.laranja,
    },

    nomeDestaque: {
        fontSize: fontes.fontpeq,
        fontFamily: fontes.negrito,
        color: cores.preto,
        textAlign: 'center',
        marginTop: 10,
        height: 30,
    },

    descricaoDestaque: {
        fontSize: 10,
        fontFamily: fontes.comum,
        color: cores.cinzclaro,
        textAlign: 'center',
        marginTop: 2,
        height: 30,
        margin: 5,
    },

    rodapeDestaque: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
    },

    precoDestaque: {
        fontSize: fontes.fontpeq,
        fontFamily: fontes.negrito,
        color: cores.laranja,
    },

    btnAdicionar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: cores.laranja,
        alignItems: 'center',
        justifyContent: 'center',
    },

    imgAdicionar: {
        width: 10,
        height: 10,
        tintColor: cores.branco,
    },

});

export default cardapioStyle;