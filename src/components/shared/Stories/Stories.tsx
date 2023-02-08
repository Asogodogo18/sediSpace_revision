import { View, Text, ScrollView } from "react-native";
import React from "react";

import SingleStory, { StoryProps } from "./Story";

type StoryListProps = {
  data: StoryProps[];
};
const emptyUser = {};

const stories: React.FC<StoryListProps> = ({ data }) => {
  return (
    <ScrollView
      horizontal
      style={{maxHeight:60}}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        height: 60,
        alignItems: "center",
      }}
    >
      {data.map((story, index) => (
        <SingleStory key={index} {...story} />
      ))}
    </ScrollView>
  );
};

export default stories;
