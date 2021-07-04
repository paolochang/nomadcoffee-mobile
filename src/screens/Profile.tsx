import React, { useEffect, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { gql, useQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";
import useVerifyUser from "../hooks/useVerifyUser";
import styled, { useTheme } from "styled-components/native";
import {
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  RefreshControl,
  Image,
} from "react-native";
import BaseLayout from "../components/shared/BaseLayout";

const ProfileHeader = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px 20px 20px;
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
      shops {
        id
        name
        photos {
          id
          url
        }
      }
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
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const {
    data: profileData,
    loading,
    refetch,
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

  const ListHeaderComponent = () => (
    <ProfileHeader>
      <Avatar source={{ uri: profileData.seeProfile.avatar_url }} />
      <HeaderDescView>
        <ProfileText>{profileData.seeProfile.username}</ProfileText>
        <ProfileText>{profileData.seeProfile.email}</ProfileText>
      </HeaderDescView>
    </ProfileHeader>
  );

  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderItem = ({ item: shop }: { item: any }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("CoffeeShopView", {
          id: shop.id,
        })
      }
    >
      <Image
        source={{ uri: shop.photos[0].url }}
        style={{ height: width / numColumns, width: width / numColumns }}
      />
    </TouchableOpacity>
  );

  return (
    <BaseLayout loading={loading}>
      {profileData && (
        <FlatList
          data={profileData?.seeProfile?.shops}
          renderItem={renderItem}
          keyExtractor={(shop: any, index: number) => index.toString()}
          numColumns={numColumns}
          ListHeaderComponent={ListHeaderComponent}
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={theme.borderColor}
            />
          }
        />
      )}
    </BaseLayout>
  );
};

export default Profile;
