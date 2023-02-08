import React from "react";
import { BoxProps } from "@shopify/restyle";
import { Theme } from "../../theme.android";
import Box from "../shared/Box";
import Text from "../shared/Text";
import Input from "../shared/TextInput";
import Avatar from "../shared/Avatar";

type FifthStepProps = {
  image?: string;
  privacy1: string;
  privacy2: string;
  privacy3: string;
  onPrivacy1Change: (param: string) => void;
  onPrivacy2Change: (param: string) => void;
  onPrivacy3Change: (param: string) => void;
} & Partial<BoxProps<Theme>>;

const FifthStep: React.FC<FifthStepProps> = ({
  image,
  privacy1,
  privacy2,
  privacy3,
  onPrivacy1Change,
  onPrivacy2Change,
  onPrivacy3Change,
  ...props
}) => {
  return (
    <Box flex={1} justifyContent={"center"} alignItems={"center"} {...props}>
      {image && (
        <Box marginBottom={"xxxl"}>
          <Avatar type="floating" source={{ uri: image }} />
        </Box>
      )}
      <Input
        height={50}
        mb={"l"}
        type="dropdown"
        value={privacy1}
        dropdownValues={[
          "Qui peut voir mon profil?",
          "Toutes Les Personnes",
          "Mes Followers",
          "Personne",
        ]}
        onChange={onPrivacy1Change}
      />
      <Input
        height={50}
        mb={"l"}
        type="dropdown"
        value={privacy2}
        dropdownValues={[
          "Qui peut m'envoyer un message?",
          "Toutes Les Personnes",
          "Les Gens Que je Suis",
        ]}
        onChange={onPrivacy2Change}
      />
      <Input
        height={50}
        mb={"l"}
        type="dropdown"
        value={privacy3}
        dropdownValues={[
          "Afficher votre profil dans les moteurs de recherche?",
          "Oui",
          "Non",
        ]}
        onChange={onPrivacy3Change}
      />
    </Box>
  );
};

export default FifthStep;
