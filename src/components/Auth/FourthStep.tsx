import React from "react";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "../../theme.android";
import Box from "../shared/Box";
import Text from "../shared/Text";
import Avatar from "../shared/Avatar";
import Input from "../shared/TextInput";

type FourthStepProps = {
  image: string;
  language: string;
  onLanguageChange: (param: string) => void;
  country: string;
  onCountryChange: (param: string) => void;
} & Partial<BoxProps<Theme>>;

const FourthStep: React.FC<FourthStepProps> = ({
  image,
  country,
  language,
  onCountryChange,
  onLanguageChange,
  ...props
}) => {
  return (
    <Box flex={1} justifyContent={"center"} alignItems={"center"} {...props}>
      <Box mb={"xxl"}>
        <Avatar type="floating" source={{ uri: image }} />
      </Box>

      <Input
        my={"m"}
        type="dropdown"
        value={language}
        dropdownValues={["Langue", "Francais", "Anglais"]}
        onChange={onLanguageChange}
      />
      <Input
        my={"m"}
        type="dropdown"
        value={country}
        dropdownValues={["Pays", "Mali", "Ghana"]}
        onChange={onCountryChange}
      />
    </Box>
  );
};

export default FourthStep;
