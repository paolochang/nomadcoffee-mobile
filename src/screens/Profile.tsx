import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import useVerifyUser from "../hooks/useVerifyUser";
import styled, { useTheme } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import BaseLayout from "../components/shared/BaseLayout";

const ProfileHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 20px;
`;
const Avatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: lightgray;
`;
const HeaderDescView = styled.View`
  flex-direction: column;
  margin-left: 25px;
`;
const ProfileText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      email
      name
      location
      avatar_url
      github_username
      following {
        id
        username
      }
      followers {
        id
        username
      }
      totalFollowers
      totalFollowing
      isMe
      isFollowing
    }
  }
`;

type ProfileScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Profile"
>;

interface Props {
  navigation: ProfileScreenNavigationProp;
}

const Profile: React.FC<Props> = ({ navigation }) => {
  const { data: userData } = useVerifyUser();
  const theme = useTheme();
  const {
    data: profileData,
    loading,
    refetch,
    fetchMore,
  } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username: userData?.seeMe?.username,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      title: userData?.seeMe.username,
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings" size={24} color={theme.fontColor} />
        </TouchableOpacity>
      ),
    });
  }, []);

  return (
    <BaseLayout loading={loading}>
      {profileData && (
        <ProfileHeader>
          <Avatar source={{ uri: profileData.seeProfile.avatar_url }} />
          <HeaderDescView>
            <ProfileText>{profileData.seeProfile.username}</ProfileText>
            <ProfileText>{profileData.seeProfile.email}</ProfileText>
          </HeaderDescView>
        </ProfileHeader>
      )}
    </BaseLayout>
  );
};

export default Profile;
