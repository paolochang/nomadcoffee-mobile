import React from "react";
import { View, ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

type Props = {
  loading: boolean;
  children: any;
};

const ScreenLayout: React.FC<Props> = ({ loading, children }) => {
  return (
    <Container>
      {loading ? <ActivityIndicator color="white" /> : children}
    </Container>
  );
};

export default ScreenLayout;
