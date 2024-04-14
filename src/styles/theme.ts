import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface PaletteColor {}
  interface SimplePaletteColorOptions {}

  interface TypographyVariants {}

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {}
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {}
}
//define primary color
const primaryColor = "#299AF4";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: primaryColor,
    },
  },

  typography: {
    fontFamily: ["Nunito", "sans-serif"].join(","),
  },
});
