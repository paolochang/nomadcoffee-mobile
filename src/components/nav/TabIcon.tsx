import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface ITabIcon {
  iconName: any;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<ITabIcon> = ({ iconName, focused, color }) => {
  return (
    <Ionicons
      name={focused ? iconName : `${iconName}-outline`}
      color={color}
      size={focused ? 24 : 20}
    />
  );
};

export default TabIcon;
