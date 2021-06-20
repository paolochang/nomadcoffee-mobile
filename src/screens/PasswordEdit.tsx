import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text } from "react-native";
import BaseLayout from "../components/shared/BaseLayout";
import { SharedStackParamList } from "../navigators/SharedStackNav";
import { Button, FormInput, FormErrorText } from "../components/shared/inputs";
import styled from "styled-components/native";

const FormContainer = styled.View`
  padding: 10px;
`;

type PasswordEditScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "PasswordEdit"
>;

interface Props {
  navigation: PasswordEditScreenNavigationProp;
}

const PasswordEdit: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onValidSubmit = () => {
    console.log(`ProfileEdit / onValidSubmit`);
  };

  return (
    <BaseLayout loading={false}>
      <FormContainer>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Enter new password"
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Enter password again"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              secureTextEntry
              hasError={false}
            />
          )}
          name="check"
          rules={{
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 7,
              message: "Minimum length must be longer than 7 characters",
            },
            pattern: {
              value: getValues("password"),
              message: "Password must match",
            },
          }}
          defaultValue=""
        />
        {errors.check && <FormErrorText message={errors.check.message} />}
        <Button
          text="Update password"
          loading={false}
          disabled={false}
          onPress={handleSubmit(onValidSubmit)}
        />
      </FormContainer>
    </BaseLayout>
  );
};

export default PasswordEdit;
