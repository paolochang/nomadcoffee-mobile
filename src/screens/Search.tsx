import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import styled from "styled-components/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";

const Container = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const SearchText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

type SearchScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Search"
>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

const Search: React.FC<Props> = ({ navigation }) => {
  return (
    <Container>
      <SearchText>Seach</SearchText>
    </Container>
  );
};

export default Search;
