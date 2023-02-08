import React, { useState } from "react";
import { TouchableOpacity, TextInput } from "react-native";
import { EventRegister } from "react-native-event-listeners";

import Box from "../shared/Box";
import Text from "../shared/Text";

type SectionItemProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange: (text: string) => void;
};

type SectionsItemsProps = {
  title: string;
  data: SectionItemProps[];
};

const SectionsItems: React.FC<SectionsItemsProps> = ({ title, data }) => {
  return (
    <Box width={"100%"} padding={"m"}>
      <Text
        mb={"m"}
        color={"grayDark"}
        textTransform={"capitalize"}
        variant={"title"}
      >
        {title}
      </Text>
      {data.map((sectionItem, index) => (
        <SectionItem key={index} {...sectionItem} />
      ))}
    </Box>
  );
};

const SectionItem: React.FC<SectionItemProps> = ({
  label,
  value,
  placeholder,
  onChange,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const handlePress = () => {
    toggleSwitch();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={{ width: "100%" }}>
      <Box width={"100%"} flexDirection={"column"}>
        {label !== "" && (
          <Box alignItems={"flex-start"} pl="l">
            <Text textTransform={"capitalize"} variant={"title"}>
              {label}
            </Text>
          </Box>
        )}
        <Box
          width={"100%"}
          minHeight={40}
          borderRadius={4}
          borderWidth={isFocused ? 2 : 0}
          borderColor={"lightgreen"}
          backgroundColor={"fadingWhite"}
          ml={"s"}
          my={"s"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <TextInput
            editable={isEnabled}
            placeholder={placeholder}
            style={{ paddingLeft: 15, width: "100%", height: 30 }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={value}
            onChange={() => EventRegister.emit("user profile updated")}
            onChangeText={onChange}
          />
        </Box>
      </Box>
    </TouchableOpacity>
  );
};

export default SectionsItems;
