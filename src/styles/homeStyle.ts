import { StyleSheet } from "react-native"
import { cores } from "./variaveis";
import { fontes } from "./variaveis";

const homeStyle = StyleSheet.create({

    header: {
        width: '80%',
        justifyContent: "center",
        margin: "auto",
        marginTop: 80,
    },
    conteudo: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexDirection: "row",
        width: '100%',

    },
    titulo: {

        fontSize: 30,
        fontWeight: "bold",
        color: cores.preto,
        textAlign: "center",
        fontFamily: fontes.negrito
    },
    bordaPerfil: {
        padding: 15,
        borderColor: cores.laranja,
        borderRadius: "50%",
        borderWidth: 2,
         backgroundColor:cores.laranjaclaro,
    },
    perfil: {
        width: 50,
        height: 50,
    },
    subtitulo: {
        marginTop: 10,
        fontSize: 18,
        color: cores.cinzclaro
    },
    main: {
        width: '80%',
        margin: "auto",
        marginTop:30,
    },
    buscaPoduto: {
        width: '100%',
        height: 50,
        borderColor: cores.laranja,
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        flexDirection:'row'
    

    },

    txtProduto: {
        marginVertical: 'auto',
        color: cores.preto,
        fontSize: 15,
        width:'100%',

    },
    btnBuscar: {
        width:30,
        height:30,
         backgroundColor:cores.laranjaclaro,


    },

    imgBuscar: {

    },
banner:{
    width:'100%',
    height:160,
    borderRadius:20,
    marginTop:30,

},

tituloCategoria:{
    fontSize: 30,
        fontWeight: "bold",
        color: cores.preto,
        
        fontFamily: fontes.negrito,
        margin:20,
},

categoria:{
    width:'100%', 
    marginTop:30,
},
conteudoCategoria:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',

},

tituloSecao:{
    fontSize:30,
    color:cores.preto,
    fontFamily:fontes.negrito,
    marginBottom:10,
},

itemCategoria:{
    width:50,
    height:50,
    borderRadius:10,
    borderColor:cores.laranja,
    borderWidth:2,
    paddingVertical:3,
    paddingHorizontal:10,
    alignItems:'center',
    backgroundColor:cores.laranjaclaro,
},

imgCategoria:{
    width:30,
    height:30,

},

txtCategoria:{
fontSize:12,
fontFamily:fontes.comum,
color:cores.cinzclaro,

},

destaque:{
  width:'100%', 
  marginTop:10,
}




});

export default homeStyle;