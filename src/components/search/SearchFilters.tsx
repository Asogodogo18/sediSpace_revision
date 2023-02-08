import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import React from "react";
import Box from "../shared/Box";
import SearchFilter from "./SearchFilter";
import theme from "../../theme.android";

type SearchFilterProps = {
  label: string;
};

type SearchFiltersProps = {
  data: SearchFilterProps[];
  onPress: (param: any) => void;
};

const SearchFilters: React.FC<SearchFiltersProps> = ({ data, onPress }) => {
  const { width } = useWindowDimensions();
  return (
    <ScrollView
      horizontal
      style={{height:40}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "center",
        alignItems: "center",
        height: 40,
        backgroundColor: theme.colors.whitishGray,
        
        
      }}
    >
      {data.map((item, index) => (
        <SearchFilter key={index} {...item} onPress={onPress} />
      ))}
    </ScrollView>
  );
};

export default SearchFilters;
