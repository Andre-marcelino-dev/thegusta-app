import { StyleSheet, TextInput } from "react-native";
import { cores } from "./variaveis";
import { fontes} from "./variaveis";



const redefinirSenhaStyle = StyleSheet.create({
  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
  },

  titulo: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
    color: cores.preto,
    textAlign: "center",
    fontFamily:'Oswald_700Bold',
  },

  subtitulo: {
    marginTop: 10,
    fontSize: 18,
    color: cores.cinzclaro,
  },

  form: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    paddingHorizontal: "5%",
  },

  input: {
    height: 50,
    flexDirection: "row",
    borderColor: cores.laranja,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    width: "100%",
    marginVertical: 10,
    justifyContent: "space-between",
  },

  icone: {
    width: 30,
    height: 30,
    marginRight: 10,
  },

  TextInput: {
    width: "100%",
  },

  btnMostrarSenha: {
    justifyContent: "center",
  },

  mostrarSenha: {
    width: 20,
    height: 20,
    marginVertical: 5,
  },

  txtEnviar: {
    fontSize: fontes.fontmedia,
    color: cores.preto,
    textDecorationLine: "underline",
  },

  termosUso: {
    flexDirection: "row",
    width: "100%",
  },

  btnTermos: {
    width: 20,
    height: 20,
    marginRight: 10,
  },

  checkTermos: {
    width: "100%",
    height: "100%",
    backgroundColor: cores.branco,
    borderColor: cores.laranja,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  checkTermosAtivo: {
    backgroundColor: cores.laranja,
  },

  checkOK: {
    fontSize: fontes.fontmedia,
    textAlign: "center",
    textAlignVertical: "center",
    lineHeight: 15,
  },

  txtTermos: {
    fontSize: 15,
    color: cores.cinzclaro,
  },

  termoAceito: {
    color: cores.cinzclaro,
  },

  linkTermos: {
    fontSize: 15,
    color: cores.laranja,
    textDecorationLine: "underline",
  },

  btnSalvar: {
    width: "80%",
    height: 50,
    backgroundColor: cores.laranja,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
    
  },




  btnCriarConta: {
    width: "80%",
    height: 50,
    backgroundColor: cores.laranja,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: cores.laranja,
    borderWidth: 2,
  },

  txtCriarConta: {
    color: cores.preto,
    fontSize:fontes.fonttitulo,
    fontWeight: "bold",
  },

  btnSalvarPressed: {
    backgroundColor: cores.laranja,
  },


    btnVoltar: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFE8C5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderColor: "#ff9800",
    borderWidth: 2,
  },

  txtVoltar: {
    color: "#000000",
    fontSize:fontes.fontmedia,
    fontWeight: "bold",
  },

  btnVoltarPressed: {
    backgroundColor: "#ff9800",
  },
});

export default redefinirSenhaStyle;
