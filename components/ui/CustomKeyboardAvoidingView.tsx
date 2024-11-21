import React, {ReactNode} from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface CustomKeyboardAvoidingViewProps {
  children: ReactNode;
}

export const CustomKeyboardAvoidingView: React.FC<
  CustomKeyboardAvoidingViewProps
> = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

export default CustomKeyboardAvoidingView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  } as ViewStyle,
});
