import React, { useState } from "react";
import AppLoading from "expo-app-loading";
import { ApolloProvider } from "@apollo/client";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import GeneralNav from "./src/navigators/GeneralNav";

export default function App() {
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const onFinish = () => setLoading(false);
  const preloadAssets = async () => {
    const fontsToLoad = [Ionicons.font];
    const fontPromises = fontsToLoad.map((font: any) => Font.loadAsync(font));
    const imagesToLoad = [require("./src/assets/m.png")];
    const imagePromises = imagesToLoad.map((image: any) =>
      Asset.loadAsync(image)
    );
    await Promise.all([fontPromises, imagePromises]);
  };
  const preload = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      isLoggedInVar(true);
      tokenVar(token);
    }
    return preloadAssets();
  };

  if (loading) {
    return (
      <AppLoading
        startAsync={preload}
        onFinish={onFinish}
        onError={console.warn}
      />
    );
  }

  return (
    <ApolloProvider client={client}>
      <AppearanceProvider>
        <ThemeProvider theme={colorScheme === "dark" ? darkTheme : lightTheme}>
          <NavigationContainer>
            <GeneralNav />
          </NavigationContainer>
        </ThemeProvider>
      </AppearanceProvider>
    </ApolloProvider>
  );
}
