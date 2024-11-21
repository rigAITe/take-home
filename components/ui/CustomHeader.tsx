import {useTheme} from "@react-navigation/native";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {AntDesign} from "@expo/vector-icons";
import {useNavigation} from "expo-router";

interface CustomHeaderProps {
  headerText: string;
  showBackNavigation?: boolean;
  onPress?: () => void;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  headerText,
  showBackNavigation,
}) => {
  const {top} = useSafeAreaInsets();
  const navigation = useNavigation();

  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <StatusBar barStyle={"dark-content"} />
      <View style={styles.head}>
        <Pressable style={{flex: 1}} onPress={() => navigation.goBack()}>
          {showBackNavigation ? (
            <AntDesign name="left" size={24} color="black" />
          ) : null}
        </Pressable>
        <View style={{flex: 3, alignItems: "center"}}>
          <Text style={styles.header}>{headerText}</Text>
        </View>
        <View style={{flex: 1}} />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    borderBottomColor: "#F7F7F8",
    borderBottomWidth: 1,
    backgroundColor: "white",
  },
  head: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  text: {
    fontSize: 14,
    color: "black",
    lineHeight: 21,
    textAlign: "center",
  },
  header: {
    fontSize: 18,
    color: "#17181C",
    lineHeight: 26,
    textAlign: "center",
  },
  rightIcon: {
    width: 24,
    height: 24,
  },
});
