import {createUserWithEmailAndPassword} from "firebase/auth";
import {getAuth, Auth} from "firebase/auth";
import {auth} from "../firebaseConfig";
import Toast from "react-native-toast-message";
import {getErrorText} from "../coreFunctions/coreFunctions";

export const signUserUp = async (
  email: string,
  password: string
): Promise<void> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    Toast.show({
      type: "error",
      text2: getErrorText(error.message),
    });
    throw new Error(error.message);
  }
};
