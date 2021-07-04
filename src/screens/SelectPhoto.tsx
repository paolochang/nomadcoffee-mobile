import React, { useState, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import * as MediaLibrary from "expo-media-library";
import {
  TouchableOpacity,
  FlatList,
  Image,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import BaseLayout from "../components/shared/BaseLayout";
import { LoggedInStackParamList } from "../navigators/GeneralNav";

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.primary.main};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const Top = styled.View`
  flex: 1;
`;
const Bottom = styled.View`
  flex: 1;
`;
const ImageContainer = styled.TouchableOpacity``;
const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

interface IPhoto {
  filename: string;
  id: string;
  uri: string;
}

type SelectPhotoScreenNavigationProp = StackNavigationProp<
  LoggedInStackParamList,
  "UploadShop"
>;

type Props = {
  navigation: SelectPhotoScreenNavigationProp;
};

// export default function SelectPhoto({ navigation }: Props) {
const SelectPhoto: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [approved, setApproved] = useState(false);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const { width } = useWindowDimensions();
  const numColumns = 4;

  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync();
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };

  const getPermissions = async () => {
    const { accessPrivileges, canAskAgain } =
      await MediaLibrary.getPermissionsAsync();

    if (accessPrivileges === "none" && canAskAgain) {
      const { accessPrivileges } = await MediaLibrary.requestPermissionsAsync();
      if (accessPrivileges !== "none") {
        setApproved(true);
        getPhotos();
      }
    } else if (accessPrivileges !== "none") {
      setApproved(true);
      getPhotos();
    }
  };

  useEffect(() => {
    getPermissions();
  }, []);

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate("UploadShop", { file: chosenPhoto })}
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);

  const choosePhoto = (uri: string) => {
    setChosenPhoto(uri);
  };

  const renderItem = ({ item: photo }: { item: IPhoto }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        source={{ uri: photo.uri }}
        style={{ width: width / numColumns, height: width / numColumns }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={24}
          color={photo.uri === chosenPhoto ? theme.primary.main : "white"}
        />
      </IconContainer>
    </ImageContainer>
  );

  return (
    <BaseLayout loading={false}>
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={numColumns}
        />
      </Bottom>
    </BaseLayout>
  );
};

export default SelectPhoto;
