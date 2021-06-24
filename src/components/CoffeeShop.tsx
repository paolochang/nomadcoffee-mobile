import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled, { useTheme } from "styled-components/native";
import { TouchableOpacity, Image, useWindowDimensions } from "react-native";
import Logo from "./shared/Logo";

interface IContainer {
  postHeight: number;
}
const Container = styled.View<IContainer>`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.contentBackgroundColor};
  height: ${(props) => props.postHeight + "px"};
`;
const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;
const HeaderDesc = styled.View`
  display: flex;
  flex-direction: column;
`;
const ShopName = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 20px;
  font-weight: 700;
`;
const ShopLocation = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;
const ShopImage = styled.Image``;
const CannotLoadView = styled.View`
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CannotLoadText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  font-weight: 500;
`;
const CategoriesView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
`;
const CategoryTitle = styled.Text`
  color: ${(props) => props.theme.fontColor};
  font-weight: 700;
`;
const CategoryView = styled.View`
  background-color: ${(props) => props.theme.primary.main};
  border: 1px solid ${(props) => props.theme.primary.main};
  border-radius: 8px;
  margin: 0px 5px;
`;
const CategoryText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  padding: 2px 5px;
`;

interface IProp {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  photos: any[];
  categories: {
    name: string;
    slug: string;
  }[];
  is_mine: boolean;
  setIsOption: any;
}

const CoffeeShop: React.FC<IProp> = ({
  id,
  name,
  latitude,
  longitude,
  photos,
  categories,
  is_mine,
  setIsOption,
}) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const theme = useTheme();
  const headerHeight = useState<number>(latitude && longitude ? 60 : 40)[0];
  const [imageHeight, setImageHeight] = useState<number>(200);
  const catHeight = useState<number>(50)[0];
  const [postHeight, setPostHeight] = useState<number>(
    headerHeight + imageHeight + catHeight
  );

  useEffect(() => {
    Image.getSize(photos[0].url, (width, height) => {
      setImageHeight(height / (width / windowWidth));
      setPostHeight(headerHeight + imageHeight + catHeight);
    });
  }, [photos]);

  useEffect(() => {}, [is_mine]);

  const optionHandler = () => {
    setIsOption(id);
  };

  return (
    <Container postHeight={postHeight}>
      <Header>
        <HeaderDesc>
          <ShopName>{name}</ShopName>
          {latitude && longitude ? (
            <ShopLocation>
              {latitude}, {longitude}
            </ShopLocation>
          ) : null}
        </HeaderDesc>
        {is_mine && (
          <TouchableOpacity onPress={optionHandler}>
            <Ionicons
              name="ellipsis-horizontal"
              size={24}
              color={theme.fontColor}
            />
          </TouchableOpacity>
        )}
      </Header>
      {photos && photos[0].url ? (
        <ShopImage
          resizeMode="cover"
          source={{ uri: photos[0].url }}
          style={{ width: windowWidth, height: imageHeight }}
        />
      ) : (
        <CannotLoadView>
          <Logo logoSize={35} />
          <CannotLoadText>Image cannot be loaded</CannotLoadText>
        </CannotLoadView>
      )}
      {categories !== undefined && (
        <CategoriesView>
          <CategoryTitle>Catetories: </CategoryTitle>
          {categories.map((cat, index) => (
            <CategoryView key={index}>
              <CategoryText>{cat.name}</CategoryText>
            </CategoryView>
          ))}
        </CategoriesView>
      )}
    </Container>
  );
};

export default CoffeeShop;
