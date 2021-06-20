import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { logOutUser } from "../../apollo";
import { SharedStackParamList } from "../navigators/SharedStackNav";

const SettingOption = styled.TouchableOpacity`
  padding: 10px;
`;
const SettingText = styled.Text`
  font-size: 18px;
  font-weight: 600;
`;

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
      <SettingOption onPress={() => navigation.navigate("ProfileEdit")}>
        <SettingText>Edit Profile</SettingText>
      </SettingOption>
      <SettingOption onPress={() => navigation.navigate("PasswordEdit")}>
        <SettingText>Change Password</SettingText>
      </SettingOption>
      <SettingOption onPress={logout}>
        <SettingText>Logout</SettingText>
      </SettingOption>
    </View>
  );
};

export default Settings;
