import {StyleSheet} from "react-native"
import { cores } from "./variaveis";

const enviaLinkStyle = StyleSheet.create({

sobrepor:{
 flex:1,
 backgroundColor:cores.preto,
 justifyContent:'center',
 alignItems:'center',
 padding:20,
},

conteudo:{
    width: '100%',
    height:'90%',
    backgroundColor:cores.branco,
    borderRadius:20,
    padding:20,
    alignItems:'center',
    

},

titulo:{

    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    color:cores.preto,

},

btnEntendi:{
    backgroundColor:cores.laranja,
    borderRadius:10,
    padding:10,
    width:"50%",
    height:50,
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
},

txtEntendi:{
    fontSize:15,
    color:cores.preto,
    fontWeight:'bold',
},

scroll:{
    marginVertical:20,
    
    
},

subtitulo:{
    fontSize:18,
    color:cores.laranja,
    marginVertical:10,
},

texto:{
    fontSize:15,
    color:cores.cinzclaro,
    lineHeight:20,
    textAlign:'justify',
}

});

export default enviaLinkStyle;