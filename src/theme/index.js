import { createTheme } from "@mui/material";
import palette from "./core/colors";
import ComponentsOverrides from "./core/components";

const theme = createTheme({
  palette,
});

theme.components = ComponentsOverrides(theme);

export default theme;
