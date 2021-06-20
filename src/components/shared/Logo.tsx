import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components/native";

const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
interface INomadImage {
  imageSize: number;
}
const NomadImage = styled.Image<INomadImage>`
  width: ${(props) => props.imageSize + "px"};
  height: ${(props) => props.imageSize + "px"};
`;
interface ILogoText {
  fontSize: number;
}
const LogoText = styled.Text<ILogoText>`
  margin-left: 10px;
  font-size: ${(props) => props.fontSize + "px"};
  font-weight: 600;
  color: ${(props) => props.theme.fontColor};
`;

interface Props {
  logoSize: number;
}

const Logo: React.FC<Props> = ({ logoSize }) => {
  const imageSize = useState<number>(logoSize * 1.15)[0];
  const fontSize = useState<number>(logoSize)[0];

  return (
    <Container>
      <NomadImage
        imageSize={imageSize}
        source={require("../../assets/m.png")}
      />
      <LogoText fontSize={fontSize}>x Coffee</LogoText>
    </Container>
  );
};

export default Logo;
