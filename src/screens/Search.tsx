import { gql, useLazyQuery } from "@apollo/client";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useWindowDimensions } from "react-native";
import styled, { useTheme } from "styled-components/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import DismissKeyboard from "../components/shared/DismissKeyboard";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";

interface ISearchBar {
  width: number;
}
const SearchBar = styled.TextInput<ISearchBar>`
  background-color: ${(props) => props.theme.contentBackgroundColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  color: ${(props) => props.theme.fontColor};
  padding: 7px 10px;
  border-radius: 7px;
  width: ${(props) => props.width / 1.5 + "px"};
`;
const MessageContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;
const MessageText = styled.Text`
  margin-top: 10px;
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
`;

const SEARCH_COFFEESHOPS_QUERY = gql`
  query searchCoffeeShops($keyword: String!, $lastId: Int) {
    searchCoffeeShops(keyword: $keyword, lastId: $lastId) {
      id
      name
      photos {
        id
        url
      }
    }
  }
`;

type SearchScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Search"
>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

const Search: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const numColumns = 3;
  const { width } = useWindowDimensions();
  const { control, handleSubmit } = useForm();
  const [searchCoffeeShops, { loading, data, called }] = useLazyQuery(
    SEARCH_COFFEESHOPS_QUERY
  );

  const onValidSubmit = ({ keyword }: { keyword: string }) => {
    searchCoffeeShops({
      variables: {
        keyword,
      },
    });
  };

  const SearchBox = () => (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <SearchBar
          placeholderTextColor={theme.fontColor}
          placeholder="Keyword"
          value={value}
          onChangeText={(value) => onChange(value)}
          onBlur={onBlur}
          width={width}
          autoCapitalize="none"
          onSubmitEditing={handleSubmit(onValidSubmit)}
        />
      )}
      name="keyword"
      defaultValue=""
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: SearchBox,
    });
  }, []);

  const renderItem = ({ item: shop }: { item: any }) => {
    return (
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
  };

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.contentBackgroundColor,
        }}
      >
        {loading ? (
          <MessageContainer>
            <ActivityIndicator />
            <MessageText>Searching...</MessageText>
          </MessageContainer>
        ) : null}
        {!called ? (
          <MessageContainer>
            <MessageText>Search by keyword...</MessageText>
          </MessageContainer>
        ) : null}
        {data?.searchCoffeeShops !== undefined ? (
          data.searchCoffeeShops.length === 0 ? (
            <MessageContainer>
              <MessageText>Could not find anything.</MessageText>
            </MessageContainer>
          ) : (
            <FlatList
              data={data.searchCoffeeShops}
              keyExtractor={(shop) => shop.id.toString()}
              renderItem={renderItem}
              numColumns={numColumns}
            />
          )
        ) : null}
      </View>
    </DismissKeyboard>
  );
};

export default Search;
