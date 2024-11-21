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
import PasswordStrengthIndicator from "@/components/ui/PasswordIndicator";
import Feather from "@expo/vector-icons/Feather";
import {useFormHandler} from "@/hooks/useFormHandler";
import {signUserUp} from "./api/signUserUp";
import {Link, useNavigation, useRouter} from "expo-router";
import Toast from "react-native-toast-message";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const CreateUsersAccount = () => {
  const {bottom} = useSafeAreaInsets();
  const navigation = useNavigation();

  const router = useRouter();

  const {values, errors, handleChange} = useFormHandler({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [securePassword, setSecurePassword] = useState({
    password: true,
    confirmPassword: true,
  });

  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePassword = (key: string, value: boolean) => {
    setSecurePassword((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    try {
      await signUserUp(values.email, values.password);
      router.push("/homepage");
      Toast.show({
        type: "success",
        text2: "Sign-up successful!",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <CustomKeyboardAvoidingView>
      <CustomHeader headerText="Create Account" showBackNavigation />
      <ScrollView style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.started}>
            <Text style={styles.welcome}>Get Started ✌🏼</Text>
            <Text style={styles.info}>
              Fill out your information to get started
            </Text>
          </View>
          <CustomInput
            label="Email"
            placeholder="Input your email address"
            inputMode="email"
            onChangeText={(text) => handleChange("email", text)}
            errorText={errors?.email}
          />
          <CustomInput
            label="Password"
            placeholder="Input your password"
            inputMode="text"
            customMarginBottom={0}
            secureTextEntry={securePassword.password}
            onChangeText={(text) => handleChange("password", text)}
            rightIcon={
              <TouchableOpacity
                onPress={() =>
                  togglePassword("password", !securePassword.password)
                }
              >
                <Feather
                  name={securePassword.password ? "eye" : "eye-off"}
                  size={20}
                  color="#748181"
                />
              </TouchableOpacity>
            }
          />
          <PasswordStrengthIndicator
            password={values.password}
            setPasswordStatus={setPasswordStatus}
          />
          <CustomInput
            label="Confirm Password"
            placeholder="Input your password"
            inputMode="text"
            customMarginBottom={0}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry={securePassword.confirmPassword}
            errorText={errors?.confirmPassword}
            rightIcon={
              <TouchableOpacity
                onPress={() =>
                  togglePassword(
                    "confirmPassword",
                    !securePassword.confirmPassword
                  )
                }
              >
                <Feather
                  name={securePassword.confirmPassword ? "eye" : "eye-off"}
                  size={20}
                  color="#748181"
                />
              </TouchableOpacity>
            }
          />
          <View style={[styles.register, {paddingBottom: bottom}]}>
            <Text>Already a user?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.accountCreation}> Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <CustomButton
        isLoading={isLoading}
        onPress={handleSignUp}
        buttonLabel="Sign Up"
        disabled={
          !passwordStatus ||
          errors?.email !== "" ||
          values?.email === "" ||
          values?.password !== values?.confirmPassword
        }
      />
    </CustomKeyboardAvoidingView>
  );
};

export default CreateUsersAccount;

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
  register: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  accountCreation: {
    color: "#05A2BF",
  },
});
