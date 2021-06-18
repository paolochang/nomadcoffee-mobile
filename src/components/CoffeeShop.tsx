import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  height: 300px;
`;
interface IPhoto {
  id: string;
  uri: string;
}
interface IProp {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  photo: IPhoto;
  categories: {
    name: string;
    slug: string;
  };
}

const CoffeeShop: React.FC<IProp> = ({
  id,
  name,
  latitude,
  longitude,
  photo,
}) => {
  return (
    <Container>
      <Text style={{ color: "black" }}>
        {id}: {name}
      </Text>
    </Container>
  );
};

export default CoffeeShop;
