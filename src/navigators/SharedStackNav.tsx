import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTheme } from "styled-components/native";
import Home from "../screens/Home";
import LogIn from "../screens/LogIn";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import SignUp from "../screens/SignUp";
import Settings from "../screens/Settings";
import { Ionicons } from "@expo/vector-icons";
import ProfileEdit from "../screens/ProfileEdit";
import PasswordEdit from "../screens/PasswordEdit";

const Stack = createStackNavigator();

export type SharedStackParamList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Settings: undefined;
  ProfileEdit: undefined;
  PasswordEdit: undefined;
};

interface ISharedStackNav {
  screenName: string;
}

export default function SharedStackNav({ screenName }: ISharedStackNav) {
  const theme = useTheme();
  return (
    <Stack.Navigator
      headerMode="screen"
      mode="modal"
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: theme.fontColor,
        headerStyle: {
          shadowColor: "rgba(0,0,0,0.3)",
          backgroundColor: theme.backgroundColor,
          height: 103,
        },
      }}
    >
      {screenName === "Home" && <Stack.Screen name={"Home"} component={Home} />}
      {screenName === "Search" && (
        <Stack.Screen name={"Search"} component={Search} />
      )}
      {screenName === "Profile" && (
        <Stack.Screen name={"Profile"} component={Profile} />
      )}
      {screenName === "LogIn" && (
        <Stack.Screen name={"LogIn"} component={LogIn} />
      )}
      <Stack.Screen
        name={"SignUp"}
        component={SignUp}
        options={{
          headerTitle: "Create an account",
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
      />
      <Stack.Screen
        name={"Settings"}
        component={Settings}
        options={{
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
      />
      <Stack.Screen
        name={"ProfileEdit"}
        component={ProfileEdit}
        options={{
          headerTitle: "Edit profile",
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
      />
      <Stack.Screen
        name={"PasswordEdit"}
        component={PasswordEdit}
        options={{
          headerTitle: "Change password",
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}
