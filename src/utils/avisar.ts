import { Alert, Platform } from "react-native";

// Mostra um aviso simples. O Alert do React Native não aparece na versão web,
// então lá usamos o alert do navegador.
export function avisar(mensagem: string) {
    if (Platform.OS === "web") window.alert(mensagem);
    else Alert.alert("TheGusta", mensagem);
}
