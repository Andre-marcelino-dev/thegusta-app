import { SplashScreen, Stack } from "expo-router";

import { useFonts} from 'expo-font';

import { Oswald_400Regular, Oswald_700Bold}from '@expo-google-fonts/oswald';
import { useEffect } from "react";

export const fontesCarregar={Oswald_400Regular, Oswald_700Bold}

export default function RootLayout (){
  const [fontsLoader]= useFonts(fontesCarregar);

  useEffect(() => {
    if(fontsLoader){
      SplashScreen.hideAsync();
    }

  })
  return(
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}