import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View, Text } from "react-native";
import { logOutUser } from "../../apollo";
import { Button } from "../components/shared/inputs";
import { SharedStackParamList } from "../navigators/SharedStackNav";

type SettingsScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Settings"
>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

const Settings: React.FC<Props> = ({ navigation }) => {
  const logout = () => {
    logOutUser();
    navigation.goBack();
  };
  return (
    <View>
      <Button
        text="Edit Profile"
        onPress={() => navigation.navigate("ProfileEdit")}
        loading={false}
        disabled={false}
      />
      <Button text="Logout" onPress={logout} loading={false} disabled={false} />
    </View>
  );
};

export default Settings;
