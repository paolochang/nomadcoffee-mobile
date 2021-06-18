import React, { FC } from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

export const Input = styled.TextInput`
  width: 100%;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => props.theme.borderColor};
  border-radius: 3px;
  margin-top: 5px;
  color: rgb(38, 38, 38);
`;

export const FormInput = styled(Input)<{ hasError: Boolean }>`
  border: 1px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.primary.main};
  padding: 12px 10px;
  border-radius: 5px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  margin-top: 5px;
`;
const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-weight: 700;
`;

export function Button<FC>({
  onPress,
  disabled,
  text,
  loading,
}: {
  onPress: any;
  disabled: boolean;
  text: string;
  loading: boolean;
}) {
  return (
    <ButtonContainer onPress={onPress} disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </ButtonContainer>
  );
}

const StyledFormError = styled.Text`
  margin: 2px 0px;
  color: tomato;
  font-weight: 700;
`;
interface IFormErrorProps {
  message: string | undefined;
}
export const FormErrorText: React.FC<IFormErrorProps> = ({ message }) => {
  return message === "" || !message ? null : (
    <StyledFormError>{message}</StyledFormError>
  );
};
