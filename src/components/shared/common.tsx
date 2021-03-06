import React from "react";
import styled from "styled-components/native";

export const Separator = styled.View`
  width: 36%;
  margin: 2px 10px;
  height: 1px;
  background-color: ${(props) => props.theme.fontColor};
`;

const ORSeparatorContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 35px 0px;
  width: 100%;
  background-color: ${(props) => props.theme.backgroundColor};
`;
const ORSeparatorORText = styled.Text`
  color: ${(props) => props.theme.fontColor};
  margin: 0px 15px;
  font-weight: 600;
`;

export const ORSeparator: React.FC = () => {
  return (
    <ORSeparatorContainer>
      <Separator />
      <ORSeparatorORText>OR</ORSeparatorORText>
      <Separator />
    </ORSeparatorContainer>
  );
};
