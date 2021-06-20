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

type ProfileEditScreenNavigationProp = StackNavigationProp<
  SharedStackParamList,
  "ProfileEdit"
>;

interface Props {
  navigation: ProfileEditScreenNavigationProp;
}

const ProfileEdit: React.FC<Props> = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
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
          defaultValue=""
        />
        {errors.name && <FormErrorText message={errors.name.message} />}
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
              placeholder="Location"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              autoCapitalize="none"
              hasError={false}
            />
          )}
          name="location"
          rules={{}}
          defaultValue=""
        />
        {errors.location && <FormErrorText message={errors.location.message} />}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormInput
              placeholder="Github username"
              value={value}
              onChangeText={(value) => onChange(value)}
              onBlur={onBlur}
              autoCapitalize="none"
              hasError={false}
            />
          )}
          name="github_username"
          defaultValue=""
        />
        {errors.github_username && (
          <FormErrorText message={errors.github_username.message} />
        )}
        <Button
          text="Update profile"
          loading={false}
          disabled={false}
          onPress={handleSubmit(onValidSubmit)}
        />
      </FormContainer>
    </BaseLayout>
  );
};

export default ProfileEdit;
