import { createTheme, useTheme as useReTheme } from "@shopify/restyle";

const palette = {
  purpleLight: "#8C6FF7",
  purplePrimary: "#5A31F4",
  purpleDark: "#3F22AB",

  lightgreen: "#4FBA80",
  greenLight: "#56DCBA",
  greenPrimary: "#0ECD9D",
  greenDark: "#0A906E",
  borderColor1: "#04E851",
  borderColor2: "#FFFF",

  whitishGray: "#F7F7F7",
  gray: "#A1A1A1",
  grayDark: "#848383",
  danger: "red",

  //backgrounds
  nobg: "transparent",
  fadingWhite: "rgba(249,249,249,0.44)",
  darkOverlay: "rgba(0,0,0,0.54)",
  darkOverlay2: "rgba(0,0,0,0.44)",


  overlay: "rgba(5,57,26,0.67)",
  overlay2: "rgba(0,0,0,0.35)",


  black: "#0B0B0B",
  white: "#FFFF",
  messageOutBG: "rgba(79,186,128,0.5)",
  messageInBg: "#D9D9D9",
  red:'red'
};

const theme = createTheme({
  colors: {
    primary: palette.greenPrimary,
    ...palette,
  },
  spacing: {
    xs: 2,
    s: 4,
    m: 8,
    ml: 12.5,
    l: 16,
    xl: 24,
    xxl: 30,
    xxxl: 40,
    v: 48,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    defaults: {},
    header: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: 34,
      lineHeight: 42.5,
      color: "black",
    },
    subheader: {
      fontFamily: "Roboto",
      fontWeight: "bold",
      fontSize: 20,
      lineHeight: 36,
      color: "black",
      letterSpacing: 1.5,
    },
    title: {
      // fontFamily
      fontSize: 14,
      fontWeight: "500",
      color: "black",
      letterSpacing:1.5
    },
    titleBold: {
      // fontFamily
      fontSize: 18,
      fontWeight: "bold",
      color: "black",
      letterSpacing: 1.5,
    },
    titleBold1: {
      // fontFamily
      fontSize: 20,
      fontWeight: "bold",
      color: "white",
      letterSpacing: 1.5,
      textTransform: "capitalize",
    },
    title1: {
      // fontFamily
      fontSize: 11,
      fontWeight: "500",
      color: "black",
      textTransform: "uppercase",
      letterSpacing: 1.4,
    },
    title2: {
      // fontFamily
      fontSize: 16,
      fontWeight: "300",
      color: "white",
      textTransform: "capitalize",
    },
    subtitle: {
      // fontFamily
      fontSize: 12,
      fontWeight: "400",
      color: "gray",
    },
    subtitleLightWhite: {
      // fontFamily
      fontSize: 12,
      fontWeight: "400",
      color: "white",
      textTransform: "capitalize",
    },
    caption: {
      // fontFamily
      fontSize: 10,
      color: "gray",
    },
    body: {
      fontFamily: "Roboto",
      fontSize: 16,
      lineHeight: 24,
      color: "black",
    },
    body1: {
      fontFamily: "Roboto",
      fontSize: 14,
      color: "black",
    },
    body2: {
      fontFamily: "Roboto",
      fontSize: 12,
      color: "black",
    },
    body6: {
      fontFamily: "Roboto",
      fontSize: 10,
      color: "white",
    },
    btnText1: {
      fontFamily: "Roboto",
      fontSize: 18,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "white",
    },
    btnText2: {
      fontFamily: "Roboto",
      fontSize: 18,
      fontWeight: "bold",
      textTransform: "uppercase",
      color: "black",
    },
    btnText3: {
      fontFamily: "Roboto",
      fontSize: 14,
      fontWeight: "400",
      textTransform: "capitalize",
      color: "gray",
    },
    btnText4: {
      fontFamily: "Roboto",
      fontSize: 15,
      fontWeight: "700",
      textTransform: "capitalize",
      color: "white",
    },
    btnTextActive: {
      fontFamily: "Roboto",
      fontSize: 12,
      fontWeight: "700",
      textTransform: "uppercase",
      color: "black",
    },
    btnTextInactive: {
      fontFamily: "Roboto",
      fontSize: 11,
      fontWeight: "600",
      textTransform: "uppercase",
      color: "black",
    },
    tabText: {
      // fontFamily
      fontSize: 9,
      color: "black",
      fontWeight: "300",
    },
    tabTextActive: {
      // fontFamily
      fontSize: 10,
      color: "black",
      fontWeight: "500",
    },
  },
});

export type Theme = typeof theme;
export default theme;
export const useTheme = () => useReTheme<Theme>();
