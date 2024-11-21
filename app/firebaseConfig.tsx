import {initializeApp} from "firebase/app";
import {initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBO4pHdoqa06d486buaz3IcLfsiVvgpIQw",
  authDomain: "take-home-98ceb.firebaseapp.com",
  projectId: "take-home-98ceb",
  storageBucket: "take-home-98ceb.firebasestorage.app",
  messagingSenderId: "1036924110250",
  appId: "1:1036924110250:web:7e8fd1ec63131b3f7e97d3",
  measurementId: "G-KPP8YJVE6M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistent login state
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export {auth, app};
