import React, { useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useForm, Controller } from "react-hook-form";
import AuthLayout from "../components/shared/AuthLayout";
import { Button, FormErrorText, FormInput } from "../components/shared/inputs";
import { logUserIn } from "../../apollo";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { ORSeparator } from "../components/shared/common";
import Logo from "../components/shared/Logo";
import styled from "styled-components/native";

const JoinWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const JoinText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
  margin-right: 10px;
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
    navigation.setOptions({
      headerTitle: () => <Logo logoSize={26} />,
    });
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
        rules={{
          required: {
            value: true,
            message: "Username is required",
          },
          minLength: {
            value: 6,
            message: "Minimum length must be longer than 6 characters",
          },
        }}
        defaultValue=""
      />
      {errors.username && <FormErrorText message={errors.username.message} />}

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
        rules={{
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 7,
            message: "Minimum length must be longer than 7 characters",
          },
        }}
        defaultValue=""
      />
      {errors.password && <FormErrorText message={errors.password.message} />}
      <Button
        text="Log in"
        loading={loading}
        disabled={false}
        onPress={handleSubmit(onValid)}
      />
      <ORSeparator />
      <JoinWrapper onPress={() => navigation.navigate("SignUp")}>
        <JoinText>Join</JoinText>
        <Logo logoSize={20} />
      </JoinWrapper>
    </AuthLayout>
  );
};

export default LogIn;
