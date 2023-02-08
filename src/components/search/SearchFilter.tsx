import { View, TouchableOpacity } from "react-native";
import React from "react";
import Box from "../shared/Box";
import Text from "../shared/Text";

type SearchFilterProps = {
  label: string;
  onPress: (param: any) => void;
};

const SearchFilter: React.FC<SearchFilterProps> = ({ label, onPress }) => {
  return (
    <Box mx={'l'} height={30}>
      <TouchableOpacity
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Text variant={"title"}>{label}</Text>
      </TouchableOpacity>
    </Box>
  );
};

export default SearchFilter;
