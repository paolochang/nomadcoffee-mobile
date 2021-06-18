import React from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "./DismissKeyboard";

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
  padding: 0 40px;
`;

export const onNextField = (nextElement: any) => {
  nextElement?.current?.focus();
};

export default function AuthLayout({ children }: any) {
  return (
    <DismissKeyboard>
      <Container>
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
          style={{
            width: "100%",
          }}
        >
          {children}
        </KeyboardAvoidingView>
      </Container>
    </DismissKeyboard>
  );
}
