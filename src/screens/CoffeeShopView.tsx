import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import CoffeeShop from "../components/CoffeeShop";
import { gql, useQuery } from "@apollo/client";
import BaseLayout from "../components/shared/BaseLayout";
import CoffeeShopOptions from "../components/CoffeeShopOptions";

const COFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
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
      is_mine
      created_at
      updated_at
    }
  }
`;

type CoffeeShopViewScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "CoffeeShopView"
>;

type CoffeeShopViewScreenRouteProp = RouteProp<
  SharedStackParamList,
  "CoffeeShopView"
>;

type Props = {
  navigation: CoffeeShopViewScreenNavigationProp;
  route: CoffeeShopViewScreenRouteProp;
};

const CoffeeShopView: React.FC<Props> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const [isOption, setIsOption] = useState<number | null>(null);
  const { data, loading } = useQuery(COFFEESHOP_QUERY, {
    variables: {
      id,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: data?.seeCoffeeShop?.name,
    });
  }, [data]);

  return (
    <BaseLayout loading={loading}>
      <CoffeeShop {...data?.seeCoffeeShop} setIsOption={setIsOption} />
      {isOption && (
        <CoffeeShopOptions isOption={isOption} setIsOption={setIsOption} />
      )}
    </BaseLayout>
  );
};

export default CoffeeShopView;
