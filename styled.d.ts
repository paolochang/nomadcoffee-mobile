import "styled-components";
interface IPalette {
  main: string;
  contrast: string;
}
declare module "styled-components" {
  export interface DefaultTheme {
    backgroundColor: string;
    contentBackgroundColor: string;
    borderColor: string;
    borderColorAccent: string;
    fontColor: string;
    tagColor: string;
    primary: IPalette;
    secondary: IPalette;
    success: string;
  }
}
