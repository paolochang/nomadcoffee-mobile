import React, { useState } from "react";
import { useColorScheme } from "react-native";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { Asset } from "expo-asset";
import GeneralNav from "./src/navigators/GeneralNav";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import client, { isLoggedInVar, tokenVar } from "./apollo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { darkTheme, lightTheme } from "./theme";

export default function App() {
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
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
    const theme = await AsyncStorage.getItem("darkMode");
    // setDarkMode(theme);
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
      <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
        <NavigationContainer>
          <GeneralNav />
        </NavigationContainer>
      </ThemeProvider>
    </ApolloProvider>
  );
}
