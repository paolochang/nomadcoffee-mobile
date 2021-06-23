import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import { categoriesToSingleString, stringToCategories } from "../utils";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { FormInput, FormErrorText, Button } from "../components/shared/inputs";
import BaseLayout from "../components/shared/BaseLayout";

const FormContainer = styled.View`
  padding: 10px;
`;

const SEE_COFFEE_SHOP_QUERY = gql`
  query seeCoffeeShop($id: Int!) {
    seeCoffeeShop(id: $id) {
      id
      name
      latitude
      longitude
      categories {
        name
        slug
      }
    }
  }
`;

const EDIT_COFFEESHOP_MUTATION = gql`
  mutation editCoffeeShop(
    $id: Int!
    $name: String
    $latitude: String
    $longitude: String
    $files: Upload
    $category: String
  ) {
    editCoffeeShop(
      id: $id
      name: $name
      latitude: $latitude
      longitude: $longitude
      files: $files
      category: $category
    ) {
      ok
      id
      error
    }
  }
`;

type CoffeeShopEditScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "CoffeeShopEdit"
>;

type CoffeeShopEditScreenRouteProp = RouteProp<
  SharedStackParamList,
  "CoffeeShopEdit"
>;

type Props = {
  navigation: CoffeeShopEditScreenNavigationProp;
  route: CoffeeShopEditScreenRouteProp;
};

const CoffeeShopEdit: React.FC<Props> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: readData, loading: queryLoading } = useQuery(
    SEE_COFFEE_SHOP_QUERY,
    {
      variables: {
        id: id,
      },
    }
  );

  const [editCoffeeShop, { loading: mutationLoading }] = useMutation(
    EDIT_COFFEESHOP_MUTATION
  );

  useEffect(() => {
    navigation.setOptions({
      title: "Edit Coffee Shop",
      headerBackImage: ({ tintColor }) => (
        <Ionicons color={tintColor} name="close" size={28} />
      ),
    });
  });

  const onValidSubmit = ({
    name,
    latitude,
    longitude,
    category,
  }: {
    name: string;
    latitude: string;
    longitude: string;
    category: string;
  }) => {
    editCoffeeShop({
      variables: {
        id,
        name,
        latitude,
        longitude,
        category,
      },
      update: (cache, { data }) => {
        const {
          editCoffeeShop: { ok, error },
        } = data;
        if (ok) {
          cache.modify({
            id: `CoffeeShop:${id}`,
            fields: {
              name() {
                return name;
              },
              latitude() {
                return latitude;
              },
              longitude() {
                return longitude;
              },
              categories() {
                if (category) return stringToCategories(category);
              },
            },
          });
        } else {
          console.log(`error: ${error}`);
        }
      },
    });
  };

  return (
    <BaseLayout loading={queryLoading}>
      <FormContainer>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Name"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              hasError={false}
            />
          )}
          name="name"
          defaultValue={readData?.seeCoffeeShop?.name}
        />
        {errors.name && <FormErrorText message={errors.name.message} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Latitude"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              hasError={false}
            />
          )}
          name="latitude"
          defaultValue={readData?.seeCoffeeShop?.latitude}
        />
        {errors.latitude && <FormErrorText message={errors.latitude.message} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Longitude"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              hasError={false}
            />
          )}
          name="longitude"
          defaultValue={readData?.seeCoffeeShop?.longitude}
        />
        {errors.longitude && (
          <FormErrorText message={errors.longitude.message} />
        )}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Category"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              autoCapitalize="none"
              hasError={false}
            />
          )}
          name="categories"
          defaultValue={categoriesToSingleString(
            readData?.seeCoffeeShop?.categories
          )}
        />
        {errors.categories && (
          <FormErrorText message={errors.categories.message} />
        )}
        <Button
          text="Update profile"
          loading={queryLoading || mutationLoading}
          disabled={mutationLoading}
          onPress={handleSubmit(onValidSubmit)}
        />
      </FormContainer>
    </BaseLayout>
  );
};

export default CoffeeShopEdit;
