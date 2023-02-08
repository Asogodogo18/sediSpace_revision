import { View, Text, TextInput, ActivityIndicator } from "react-native";
import React from "react";

import SearchbarIcon from "../../../assets/icons/search_icon.svg";
import Box from "../shared/Box";

type SearchbarProps = {
  placeholder: string;
  value: string;
  loader: boolean;
  onChange: (param: string) => void | Function;
};
const Searchbar: React.FC<SearchbarProps> = ({
  onChange,
  placeholder = "Recherche",
  value,
  loader = false,
}) => {
  return (
    <Box
      width={"100%"}
      height={40}
      flexDirection={"row"}
      px={"m"}
      py={"s"}
      alignItems={"center"}
      borderBottomWidth={1}
      borderBottomColor={"borderColor1"}
    >
      <SearchbarIcon />
      <TextInput
        style={{ marginLeft: 4, width: "100%" }}
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
      />
      {loader ? (
        <ActivityIndicator
          style={{ alignSelf: "flex-end" }}
          size={"small"}
          color="green"
        />
      ) : null}
    </Box>
  );
};

export default Searchbar;
