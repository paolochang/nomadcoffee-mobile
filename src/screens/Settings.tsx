import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import styled from "styled-components/native";
import { logOutUser } from "../../apollo";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const SettingOption = styled.TouchableOpacity`
  padding: 10px;
`;
const SettingText = styled.Text`
  color: ${(props) => props.theme.fontColor};
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
    <Container>
      <SettingOption onPress={() => navigation.navigate("ProfileEdit")}>
        <SettingText>Edit Profile</SettingText>
      </SettingOption>
      <SettingOption onPress={() => navigation.navigate("PasswordEdit")}>
        <SettingText>Change Password</SettingText>
      </SettingOption>
      <SettingOption onPress={logout}>
        <SettingText>Logout</SettingText>
      </SettingOption>
    </Container>
  );
};

export default Settings;
