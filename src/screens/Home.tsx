import React, { useState, useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { gql, useQuery } from "@apollo/client";
import { useTheme } from "styled-components/native";
import { FlatList, RefreshControl } from "react-native";
import Logo from "../components/shared/Logo";
import ScreenLayout from "../components/shared/ScreenLayout";
import CoffeeShop from "../components/CoffeeShop";
import CoffeeShopOptions from "../components/CoffeeShopOptions";

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
      is_mine
      created_at
      updated_at
    }
  }
`;

interface IPhoto {
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
}

type HomeScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "Home"
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [isOption, setIsOption] = useState<number | null>(null);
  const [lastId, setLastId] = useState<number | null>();
  const { data, loading, refetch, fetchMore } = useQuery(FEED_QUERY, {
    variables: {
      lastId: null,
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Logo logoSize={26} />,
    });
  });

  useEffect(() => {
    if (
      data &&
      data?.seeCoffeeShops[data?.seeCoffeeShops?.length - 1] !== undefined
    ) {
      setLastId(data?.seeCoffeeShops[data?.seeCoffeeShops?.length - 1].id);
    }
  }, [data?.seeCoffeeShops]);

  const refresh = async () => {
    setRefreshing(true);
    await refetch({ lastId: null });
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: IPhoto }) => {
    return <CoffeeShop {...item} setIsOption={setIsOption} />;
  };

  return (
    <>
      <ScreenLayout loading={loading}>
        <FlatList
          onEndReachedThreshold={0.05}
          onEndReached={() =>
            fetchMore({
              variables: {
                lastId,
              },
            })
          }
          data={data?.seeCoffeeShops}
          keyExtractor={(shop, index) => `${index}_${shop.id}`}
          style={{ width: "100%" }}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              enabled={true}
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor={theme.borderColor}
            />
          }
        />
        {isOption && (
          <CoffeeShopOptions isOption={isOption} setIsOption={setIsOption} />
        )}
      </ScreenLayout>
    </>
  );
};

export default Home;
