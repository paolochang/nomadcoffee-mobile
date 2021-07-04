import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import { View } from "react-native";
import SharedStackNav from "./SharedStackNav";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../apollo";
import { useTheme } from "styled-components/native";

const Tabs = createBottomTabNavigator();

const TabsNav = () => {
  const theme = useTheme();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.fontColor,
        showLabel: false,
        style: {
          borderTopColor: "rgba(0, 0, 0)",
          backgroundColor: theme.backgroundColor,
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="home" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Home" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="Search"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="search" color={color} focused={focused} />
          ),
        }}
      >
        {() => <SharedStackNav screenName="Search" />}
      </Tabs.Screen>
      {isLoggedIn ? (
        <Tabs.Screen
          name="Camera"
          component={View}
          listeners={({ navigation }) => {
            return {
              tabPress: (e) => {
                e.preventDefault();
                navigation.navigate("Upload");
              },
            };
          }}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <TabIcon iconName={"camera"} color={color} focused={focused} />
            ),
          }}
        />
      ) : null}
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <TabIcon iconName="person" color={color} focused={focused} />
          ),
        }}
      >
        {() =>
          isLoggedIn ? (
            <SharedStackNav screenName="Profile" />
          ) : (
            <SharedStackNav screenName="LogIn" />
          )
        }
      </Tabs.Screen>
    </Tabs.Navigator>
  );
};

export default TabsNav;
