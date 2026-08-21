import {Modal, View, Text, ScrollView, Pressable} from "react-native"


import termosUsoStyle from "@/styles/termosUsoStyles";
import globalStyle from "@/styles/globalStyle";
import enviaLinkStyle from "@/styles/enviaLinkStyle";

interface EnviaLinkProps{
    visible: boolean;
    onClose: () => void;
}

export default function EnviaLinkModal(
    {
    visible, 
    onClose,
    }: EnviaLinkProps){

        return(
        <Modal
        
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >

            <View style={enviaLinkStyle.sobrepor}>

            <View style={enviaLinkStyle.conteudo}>
            <Text style={enviaLinkStyle.titulo}>Enviar Link</Text>


            
            <ScrollView style={enviaLinkStyle.scroll}>
                <Text style={enviaLinkStyle.texto}>Caso este e-mail esteja cadastrado em nosso sistema, você receberá um link de redefinição por e-mail.

                    validade do link (10 minutos)
                </Text>
                

            </ScrollView>

            <Pressable style={enviaLinkStyle.btnEntendi}
             onPress={onClose}
            
            >
            <Text style={termosUsoStyle.txtEntendi}onPress={onClose}>Ok</Text>
            </Pressable>
            </View>

            </View>

        </Modal>
        );
}