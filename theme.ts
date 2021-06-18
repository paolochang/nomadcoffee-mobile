import { DefaultTheme } from "styled-components/native";
import reset from "styled-reset";

export const defaultTheme: DefaultTheme = {
  backgroundColor: "white",
  contentBackgroundColor: "white",
  borderColor: "white",
  borderColorAccent: "rgb(38, 38, 38)",
  fontColor: "black",
  tagColor: "#000000",
  primary: {
    main: "#FF9400",
    contrast: "orange",
  },
  secondary: {
    main: "green",
    contrast: "brown",
  },
  success: "#2ecc71",
};

export const lightTheme = {
  backgroundColor: "#f5f5f5",
  contentBackgroundColor: "#ffffff",
  borderColor: "rgb(219, 219, 219)",
  borderColorAccent: "rgb(38, 38, 38)",
  fontColor: "#000000",
  tagColor: "#000000",
  primary: {
    main: "#ff9400",
    contrast: "orange",
  },
  secondary: {
    main: "green",
    contrast: "brown",
  },
  success: "#2ecc71",
};

export const darkTheme = {
  backgroundColor: "#2c2c2c",
  contentBackgroundColor: "#2c2c2c",
  borderColor: "rgb(219, 219, 219)",
  borderColorAccent: "rgb(38, 38, 38)",
  fontColor: "#ffffff",
  tagColor: "#000000",
  primary: {
    main: "#FF9400",
    contrast: "orange",
  },
  secondary: {
    main: "lightgreen",
    contrast: "brown",
  },
  success: "#2ecc71",
};
