import {ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import CustomInput from "@/components/ui/CustomInput";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomButton from "@/components/ui/CustomButton";
import CustomKeyboardAvoidingView from "@/components/ui/CustomKeyboardAvoidingView";
import {useRouter} from "expo-router";
import {logUserOut} from "./api/logUserOut";
import {getAuth, onAuthStateChanged, signOut, User} from "firebase/auth";
import {auth} from "./firebaseConfig";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    setIsLoading(true);
    try {
      await logUserOut();
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomHeader headerText="Home Page" />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.started}>
            <Text style={styles.welcome}>Welcome Home ✌🏼</Text>
            <Text style={styles.info}>{auth?.currentUser?.email}</Text>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        isLoading={isLoading}
        buttonLabel="Logout"
        onPress={handleLogOut}
      />
    </CustomKeyboardAvoidingView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    paddingHorizontal: 24,
  },
  started: {
    paddingTop: 40,
    paddingBottom: 24,
  },
  welcome: {
    fontSize: 24,
    color: "#748181",
  },
  info: {
    color: "#748181",
    paddingTop: 8,
  },
});
