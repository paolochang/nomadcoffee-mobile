import React, { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import AuthLayout from "../components/shared/AuthLayout";
import { useForm, Controller } from "react-hook-form";
import { Button, FormInput, FormErrorText } from "../components/shared/inputs";
import { ORSeparator } from "../components/shared/common";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components/native";
import Logo from "../components/shared/Logo";

const HeaderContainer = styled.View`
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(username: $username, email: $email, password: $password) {
      ok
      error
    }
  }
`;

type SignUpScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "SignUp"
>;

type Props = {
  navigation: SignUpScreenNavigationProp;
};

const SignUp: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      console.log(`createAccount / onCompleted`);
      console.log(data);
      navigation.goBack();
    },
    onError: (error) => {
      console.log(`createAccount / onError`);
      console.log(error);
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HeaderContainer>
          <JoinText>Join</JoinText>
          <Logo logoSize={20} />
        </HeaderContainer>
      ),
    });
  }, []);

  const onValid = ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    console.log(`SignUp / onValid`);
    console.log(username, email, password);
    if (!loading)
      createAccount({
        variables: {
          username,
          email,
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
            placeholder="Email"
            value={value}
            onChangeText={(value) => onChange(value)}
            onBlur={onBlur}
            keyboardType="email-address"
            autoCapitalize="none"
            hasError={false}
          />
        )}
        name="email"
        rules={{
          required: {
            value: true,
            message: "Email is required",
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        }}
        defaultValue=""
      />
      {errors.email && <FormErrorText message={errors.email.message} />}
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
      {errors.result && <FormErrorText message={errors.result.message} />}
      <Button
        text="Create account"
        loading={loading}
        disabled={errors.username || errors.email || errors.password || loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
};

export default SignUp;
