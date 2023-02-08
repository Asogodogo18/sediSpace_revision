import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Ionicons, Entypo, EvilIcons, AntDesign } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import Box from "./Box";
import Text from "./Text";
import SectionIcon, { Icons, Icon } from "./SectionIcon";

type ReplyFieldProps = {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
};

const ReplyField: React.FC<ReplyFieldProps> = forwardRef((props, ref) => {
  const { placeholder, value, onChange, onSubmit, onFocus } = props;
  const [visibleBottom, setVisibleBottom] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = ["60%", "60%"];

  // callbacks
  // const handleSheetChanges = useCallback((index: number) => {
  //   ////console.log("handleSheetChanges", index);
  // }, []);
  // const BottomSheets = () => {
  //   return (

  //   );
  // };
  return (
    <>
      {visibleBottom && (
        <Box
          style={{
            padding: 15,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            zIndex: 1000,
          }}
          bg={"white"}
          elevation={5}
        >
          <SectionIcon
            color="black"
            iconName="camerao"
            placeholder="Caméra"
            size={24}
            onPress={() => {}}
          />
          <SectionIcon
            color="black"
            iconName="picture"
            placeholder="Bibilothéque Photo et Vidéo"
            size={24}
            onPress={() => {}}
          />
          <SectionIcon
            color="black"
            iconName="book"
            placeholder="Document"
            size={24}
            onPress={() => {}}
          />
          <SectionIcon
            color="black"
            iconName="enviromento"
            placeholder="Localisation"
            size={24}
            onPress={() => {}}
          />
          <SectionIcon
            color="black"
            iconName="contacts"
            placeholder="Contact"
            size={24}
            onPress={() => {}}
          />
        </Box>
      )}
      <Box
        height={60}
        width={"100%"}
        backgroundColor={"white"}
        flexDirection={"row"}
        alignItems={"center"}
      >
        <Box
          height={40}
          width={"100%"}
          flexDirection={"row"}
          flex={7.5}
          borderColor={"borderColor1"}
          borderWidth={1}
          borderRadius={24}
          backgroundColor={"fadingWhite"}
        >
          <Box
            height={40}
            width={60}
            borderRadius={24}
            justifyContent={"center"}
            alignItems={"center"}
            backgroundColor={"lightgreen"}
          >
            <TouchableOpacity onPress={() => setVisibleBottom(!visibleBottom)}>
              {visibleBottom ? (
                <EvilIcons name="close" size={24} color="white" />
              ) : (
                <Ionicons name="add" size={28} color="white" />
              )}
            </TouchableOpacity>
          </Box>
          <TextInput
            ref={ref}
            style={{ paddingLeft: 5, width: "80%" }}
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            onSubmitEditing={onSubmit}
            onFocus={onFocus}
            onBlur={onFocus}
          />
        </Box>
        <Box
          flex={1.5}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-around"}
        >
          <TouchableOpacity onPress={onSubmit}>
            <Box
              height={36}
              width={36}
              alignItems={"center"}
              justifyContent={"center"}
              borderRadius={24}
              backgroundColor={"greenPrimary"}
            >
              <Ionicons name="md-send-sharp" size={18} color="white" />
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  );
});

export default ReplyField;
