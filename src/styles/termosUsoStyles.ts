import {StyleSheet} from "react-native"

const termosUsoStyle = StyleSheet.create({

sobrepor:{
 flex:1,
 backgroundColor:"#000000",
 justifyContent:'center',
 alignItems:'center',
 padding:20,
},

conteudo:{
    width: '100%',
    height:'90%',
    backgroundColor:'#ffffff',
    borderRadius:20,
    padding:20,
    alignItems:'center',
    

},

titulo:{

    fontSize:24,
    fontWeight:'bold',
    textAlign:'center',
    color:'#000000',

},

btnEntendi:{
    backgroundColor:'#ff9800',
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
    color:'#000000',
    fontWeight:'bold',
},

scroll:{
    marginVertical:20,
    
    
},

subtitulo:{
    fontSize:18,
    color:'#ff9800',
    marginVertical:10,
},

texto:{
    fontSize:15,
    color:"#888888",
    lineHeight:20,
    textAlign:'justify',
}

});

export default termosUsoStyle;