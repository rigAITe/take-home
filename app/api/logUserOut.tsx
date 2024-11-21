import {signOut} from "firebase/auth";
import {auth} from "./../firebaseConfig";
import Toast from "react-native-toast-message";

export const logUserOut = async (): Promise<void> => {
  try {
    await signOut(auth);
    Toast.show({
      type: "success",
      text2: "Logout Successful!",
    });
  } catch (error: any) {
    Toast.show({
      type: "error",
      text2: error.message,
    });
    throw new Error(error.message);
  }
};
