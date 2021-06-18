import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import SignUp from "../screens/SignUp";

const Stack = createStackNavigator();

export type LoggedInStackParamList = {
  Tabs: undefined;
  SignUp: undefined;
};

export default function GeneralNav() {
  return (
    <Stack.Navigator mode="modal">
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
    </Stack.Navigator>
  );
}
