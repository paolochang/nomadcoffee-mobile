import React, { useEffect } from "react";
import { Text, TextInput } from "react-native";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../components/shared/AuthLayout";
import { Button, FormInput } from "../components/shared/inputs";
import { logUserIn } from "../../apollo";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { ORSeparator } from "../components/shared/common";
import styled from "styled-components/native";

const LoginText = styled.Text`
  color: ${(props) => props.theme.fontColor};
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

type LogInScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "LogIn"
>;

type Props = {
  navigation: LogInScreenNavigationProp;
};

const LogIn: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: any) => {
      console.log(`Login / useMutation / onCompleted`);
      // console.log(data);
      const {
        login: { ok, error, token },
      } = data;
      if (!ok) {
        console.log(error);
      }
      if (token) logUserIn(token);
    },
    onError: (error) => {
      console.log(`Login / useMutation / onError`);
      console.log(error);
    },
  });

  useEffect(() => {
    console.log(`Login / useEffect`);
  }, []);

  const onValid = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    console.log(`Login / onValidSubmit`);
    console.log(username, password);
    login({
      variables: {
        username,
        password,
      },
    });
  };

  return (
    <AuthLayout>
      <LoginText>Please login</LoginText>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            placeholder="Username"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            autoCapitalize="none"
            hasError={false}
          />
        )}
        name="username"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <FormInput
            placeholder="Password"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            secureTextEntry
            hasError={false}
          />
        )}
        name="password"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.username && <Text>This is required.</Text>}
      <Button
        text="Log in"
        loading={loading}
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
      <ORSeparator />
      <Button
        text="Create account"
        loading={false}
        disabled={false}
        onPress={() => navigation.navigate("SignUp")}
      />
    </AuthLayout>
  );
};

export default LogIn;
