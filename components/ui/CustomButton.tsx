import {Link} from "expo-router";
import React, {ReactNode} from "react";
import {
  StyleProp,
  TouchableOpacityProps,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  GestureResponderEvent,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Keyboard,
} from "react-native";
import type {LinkProps} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export type IButtonMode = "primary" | "light" | "error" | "disabled";

interface IProps extends TouchableOpacityProps {
  radius?: number;
  width?: number;
  buttonLabel?: string;
  leftIcon?: ReactNode;
  mode?: IButtonMode;
  disabled?: boolean | undefined;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  noBottomSpace?: boolean;
  route?: LinkProps["href"];
}

const CustomButton: React.FC<IProps> = ({
  radius = 82,
  width,
  style,
  buttonLabel,
  disabled,
  isLoading,
  route,
  noBottomSpace,
  onPress,
  ...rest
}) => {
  const {bottom} = useSafeAreaInsets();

  const handlePress = (
    e: GestureResponderEvent | React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    // In a situation where there is a reason for custom onPress.
    if (onPress) {
      Keyboard.dismiss();
      onPress(e as GestureResponderEvent);
    }
  };

  return (
    <TouchableOpacity
      {...rest}
      disabled={disabled || isLoading}
      style={[
        styles.flexContainer,
        {
          marginBottom: noBottomSpace ? 0 : bottom + 20,
          backgroundColor: disabled || isLoading ? "#ABB7C1" : "#022745",
        },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.buttonLabel}>{buttonLabel}</Text>
      {isLoading ? (
        <ActivityIndicator
          style={{
            marginLeft: 5,
            // marginTop: Platform.OS === "ios" ? -3 : 3,
          }}
          size="small"
          color={"white"}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    marginHorizontal: 24,
    paddingVertical: 15,
    borderRadius: 100,
  },
  buttonLabel: {
    textAlign: "center",
    color: "white",
  },
});
