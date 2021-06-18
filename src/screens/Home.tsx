import { gql, useQuery } from "@apollo/client";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import styled from "styled-components/native";
import ScreenLayout from "../components/shared/ScreenLayout";
import CoffeeShop from "../components/CoffeeShop";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";

const FEED_QUERY = gql`
  query seeCoffeeShops($lastId: Int) {
    seeCoffeeShops(lastId: $lastId) {
      id
      name
      latitude
      longitude
      photos {
        id
        url
      }
      categories {
        name
        slug
      }
      created_at
      updated_at
    }
  }
`;

type HomeScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      lastId: null,
    },
    onCompleted: (data) => {
      console.log(`Home / onCompleted`);
      // console.log(data);
    },
  });

  const renderItem = ({ item }: { item: any }) => {
    console.log(`renderItem`);
    console.log(item.name);
    return <CoffeeShop {...item} />;
  };

  return (
    <ScreenLayout loading={loading}>
      <FlatList
        data={data?.seeCoffeeShops}
        keyExtractor={(shop) => shop.id.toString()}
        style={{ width: "100%" }}
        renderItem={renderItem}
      />
    </ScreenLayout>
  );
};

export default Home;
