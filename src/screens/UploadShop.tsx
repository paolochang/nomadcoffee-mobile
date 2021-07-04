import React, { useEffect } from "react";
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { LoggedInStackParamList } from "../navigators/GeneralNav";
import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { SEE_COFFEE_SHOPS } from "../fragments";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styled, { useTheme } from "styled-components/native";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import { FormInput, FormErrorText } from "../components/shared/inputs";
import DismissKeyboard from "../components/shared/DismissKeyboard";

const HeaderRightText = styled.Text`
  color: ${(props) => props.theme.primary.main};
  font-size: 16px;
  font-weight: 600;
  margin-right: 7px;
`;
const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.contentBackgroundColor};
`;
const Photo = styled.Image`
  height: 300px;
`;
const FormContainer = styled.View`
  margin: 30px 10px;
`;

const CREATE_SHOP_MUTATION = gql`
  mutation createCoffeeShop($name: String!, $files: Upload, $category: String) {
    createCoffeeShop(name: $name, files: $files, category: $category) {
      ...SeeCoffeeShops
    }
  }
  ${SEE_COFFEE_SHOPS}
`;

interface IAddShopForm {
  name: string;
  category?: string;
  files?: any;
}

type UploadShopScreenNavigationProp = StackNavigationProp<
  LoggedInStackParamList,
  "UploadShop"
>;

type UploadShopRouteProp = RouteProp<LoggedInStackParamList, "UploadShop">;

type Props = {
  navigation: UploadShopScreenNavigationProp;
  route: UploadShopRouteProp;
};

const UploadShop: React.FC<Props> = ({ navigation, route }) => {
  const theme = useTheme();
  const HeaderRightLoading = () => (
    <ActivityIndicator
      size="small"
      color={theme.fontColor}
      style={{ marginRight: 10 }}
    />
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createShopMutation, { loading }] = useMutation(CREATE_SHOP_MUTATION, {
    onError: (err) => {
      console.log(`Failed to upload photo: ${err}`);
    },
    update: (cache, result) => {
      const {
        data: { createCoffeeShop },
      } = result;
      if (createCoffeeShop.id) {
        cache.modify({
          id: "ROOT_QUERY",
          fields: {
            seeCoffeeShops(prev) {
              return [createCoffeeShop, ...prev];
            },
          },
        });
        navigation.navigate("Tabs");
      }
    },
  });

  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Share</HeaderRightText>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  const onValid: SubmitHandler<IAddShopForm> = ({ name, category }) => {
    let files = [];
    const image = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: `image/jpeg`,
    });
    files.push(image);
    createShopMutation({
      variables: {
        name,
        files,
        category,
      },
    });
  };

  return (
    <DismissKeyboard>
      <Container>
        <Photo source={{ uri: route.params.file }} />
        <FormContainer>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Coffee shop name"
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                hasError={false}
              />
            )}
            name="name"
            rules={{
              required: {
                value: true,
                message: "Coffee shop name is required",
              },
            }}
            defaultValue=""
          />
          {errors.name && <FormErrorText message={errors.name.message} />}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormInput
                placeholder="Categories by comma separated"
                value={value}
                onChangeText={(value) => onChange(value)}
                onBlur={onBlur}
                hasError={false}
              />
            )}
            name="category"
            rules={{}}
            defaultValue=""
          />
          {errors.category && (
            <FormErrorText message={errors.category.message} />
          )}
        </FormContainer>
      </Container>
    </DismissKeyboard>
  );
};

export default UploadShop;
