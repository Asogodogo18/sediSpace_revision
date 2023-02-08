import React, { ReactNode } from "react";
import { BoxProps, TextProps } from "@shopify/restyle";
import { EvilIcons } from "@expo/vector-icons";
import { Platform, StyleProp, TextInput, TextStyle } from "react-native";

import { Picker } from "@react-native-picker/picker";
import { Theme } from "../../theme.android";
import Box from "./Box";

enum InputType {
  text,
  dropdown,
}

type InputProps = {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: keyof typeof InputType;
  placeholder?: string;
  value: string;
  multiline?: boolean;
  secureText?: boolean;
  dropdownValues?: string[];
  inputStyle?: StyleProp<TextStyle>;
  onChange: (param: any) => void;
  inputRef?: React.MutableRefObject<TextInput>;
} & Partial<BoxProps<Theme>>;

const Input: React.FC<InputProps> = ({
  placeholder,
  leftIcon,
  rightIcon,
  value,
  onChange,
  multiline = true,
  secureText = false,
  type = "text",
  dropdownValues,
  inputRef,
  inputStyle,
  ...props
}) => {
  return (
    <Box
      py={"m"}
      px={"l"}
      borderRadius={30}
      backgroundColor="fadingWhite"
      alignItems={"center"}
      flexDirection={"row"}
      width={300}
      minHeight={40}
      {...props}
    >
      {leftIcon ? leftIcon : null}
      {type == "text" && (
        <TextInput
          ref={inputRef}
          multiline={multiline}
          onChangeText={onChange}
          secureTextEntry={secureText}
          value={value}
          placeholder={placeholder}
          style={[
            { height: "100%", flex: 1, marginLeft: leftIcon ? 4 : 0 },
            inputStyle,
          ]}
        />
      )}
      {rightIcon ? rightIcon : null}
      {type == "dropdown" && (
        <Picker
          style={{  width:"100%", height: 40, justifyContent:'center',alignItems:'center'}}
          mode={"dropdown"}
          placeholder={placeholder}
          selectedValue={value}
          onValueChange={onChange}
          itemStyle={{ width: "100%",alignSelf:'center',height:50}}
          
        >
          {dropdownValues?.map((item, index) => (
            <Picker.Item
              style={inputStyle}
              key={index}
              label={item}
              value={item}

            />
          ))}
        </Picker>
      )}
    </Box>
  );
};

export default Input;
