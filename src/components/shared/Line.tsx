import React from "react";
import { BoxProps, TextProps } from "@shopify/restyle";

import { Theme } from "../../theme.android";
import Box from "./Box";

type LineProps = {} & Partial<BoxProps<Theme>>;

const Line: React.FC<LineProps> = ({ ...props }) => (
  <Box width={120} height={1} backgroundColor={"white"} {...props} />
);

export default Line;
