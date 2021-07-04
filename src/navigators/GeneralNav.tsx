import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadShop from "../screens/UploadShop";
import { useTheme } from "styled-components";

const Stack = createStackNavigator();

export type LoggedInStackParamList = {
  Tabs: undefined;
  UploadShop: { file: string };
};

export default function GeneralNav() {
  const theme = useTheme();
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadShop"
        options={{
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          title: "Upload Shop",
          headerTintColor: theme.fontColor,
          headerStyle: { backgroundColor: theme.backgroundColor },
        }}
        component={UploadShop}
      />
    </Stack.Navigator>
  );
}
