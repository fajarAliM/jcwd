import { merge } from "lodash";

import Button from "./Button";
import Box from "./Box";

const ComponentsOverrides = (theme) => {
  return merge(Button(theme), Box(theme));
};

export default ComponentsOverrides;
