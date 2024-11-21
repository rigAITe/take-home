import React, {ReactNode} from "react";
import {
  Platform,
  StyleProp,
  TextInput,
  TextInputProps,
  Text,
  View,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface IProps extends TextInputProps {
  rightIcon?: ReactNode;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  errorText?: string;
  height?: number;
  bgColor?: string;
  borderColor?: string;
  isEnabled?: boolean;
  editable?: boolean;
  secureTextEntry?: boolean;
  placeholder: string;
  customMarginBottom?: number;
}

const CustomInput: React.FC<IProps> = ({
  rightIcon,
  label,
  containerStyle,
  wrapperStyle,
  errorText,
  bgColor,
  borderColor,
  isEnabled,
  placeholder,
  secureTextEntry,
  customMarginBottom,
  ...rest
}) => {
  return (
    <View style={[{marginBottom: customMarginBottom ?? 20}, wrapperStyle]}>
      {label && <Text style={[styles.labelText]}>{label}</Text>}
      <View
        style={[styles.container, {borderColor: errorText ? "red" : "#DFE2E2"}]}
      >
        <TextInput
          {...rest}
          placeholder={placeholder}
          style={[styles.input]}
          placeholderTextColor={"#74818101"}
          secureTextEntry={secureTextEntry}
          textContentType="none"
        />
        {rightIcon && <View>{rightIcon}</View>}
      </View>
      {errorText && (
        <Text style={{color: "red", paddingTop: 5, fontSize: 12}}>
          {errorText}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: 12,
    borderWidth: 0.8,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontWeight: "400",
    color: "#131515",
    fontSize: 14,
    paddingVertical: Platform.OS === "android" ? 10 : 15,
  },
  labelText: {
    color: "#748181",
    paddingBottom: 5,
  },
});
