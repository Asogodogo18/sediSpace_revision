import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FeedFilter from "./FeedFilter";

type filter = {
  id: string;
  title: string;
  isActive: boolean;
};

type FeedFiltersProps = {
  data: filter[];
  onPress?: () => void;
};

const FeedFilters: React.FC<FeedFiltersProps> = ({ data, onPress }) => {
  return (
      <FlatList
        horizontal
        style={{maxHeight:35}}
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(filter) => filter.id}
        renderItem={({ item }) => (
          <FeedFilter key={item.id} {...item} onPress={onPress} />
        )}
      />
  );
};

export default FeedFilters;
