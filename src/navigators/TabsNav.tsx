import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabIcon from "../components/nav/TabIcon";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Profile from "../screens/Profile";
import SharedStackNav from "./SharedStackNav";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../apollo";
import { useTheme } from "styled-components/native";
import LogIn from "../screens/LogIn";

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
