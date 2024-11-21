import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useState} from "react";
import CustomInput from "@/components/ui/CustomInput";
import CustomHeader from "@/components/ui/CustomHeader";
import CustomButton from "@/components/ui/CustomButton";
import CustomKeyboardAvoidingView from "@/components/ui/CustomKeyboardAvoidingView";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Link, useRouter} from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import {useFormHandler} from "@/hooks/useFormHandler";
import {logUserIn} from "./api/signUserIn";
import Toast from "react-native-toast-message";

const Login = () => {
  const {bottom} = useSafeAreaInsets();
  const router = useRouter();

  const {values, errors, handleChange} = useFormHandler({
    email: "segunoba@yopmail.com",
    password: "Pass@1234",
  });

  const [securePassword, setSecurePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = () => {
    setSecurePassword(!securePassword);
  };

  const handleLogIn = async () => {
    setIsLoading(true);
    try {
      await logUserIn(values.email, values.password);
      router.push("/homepage");
      Toast.show({
        type: "success",
        text2: "Log-in Successful!",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomHeader headerText="Login" />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.started}>
            <Text style={styles.welcome}>Welcome back ✌🏼</Text>
            <Text style={styles.info}>
              Fill out your information to get started
            </Text>
          </View>
          <CustomInput
            label="Email"
            placeholder="Input your email address"
            inputMode="email"
            value={values.email}
            onChangeText={(text) => handleChange("email", text)}
            errorText={errors?.email}
          />
          <CustomInput
            label="Password"
            secureTextEntry={securePassword}
            placeholder="Input your password"
            inputMode="text"
            value={values.password}
            onChangeText={(text) => handleChange("password", text)}
            errorText={
              values.password &&
              values.password.length < 8 &&
              values.password.length > 0
                ? "Password must be at least 8 characters"
                : ""
            }
            rightIcon={
              <TouchableOpacity onPress={togglePassword}>
                <Feather
                  name={securePassword ? "eye" : "eye-off"}
                  size={20}
                  color="#748181"
                />
              </TouchableOpacity>
            }
          />
        </View>
      </ScrollView>
      <CustomButton
        isLoading={isLoading}
        onPress={handleLogIn}
        buttonLabel="Login"
        disabled={
          !!errors?.email ||
          values.email === "" ||
          values.password === "" ||
          !!errors.password
        }
        noBottomSpace
      />
      <View style={[styles.register, {paddingBottom: bottom}]}>
        <Text>You don't have an account?</Text>
        <Link href={"/createUsersAccount"}>
          <Text style={styles.accountCreation}> Create Account</Text>
        </Link>
      </View>
    </CustomKeyboardAvoidingView>
  );
};

export default Login;

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
  register: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  welcome: {
    fontSize: 24,
    color: "#748181",
  },
  info: {
    color: "#748181",
    paddingTop: 8,
  },
  accountCreation: {
    color: "#05A2BF",
  },
});
