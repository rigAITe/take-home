import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {Stack, useRouter} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "../app/firebaseConfig";
import {useColorScheme} from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser);
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Hide splash screen once fonts and auth states are loaded
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();

      // Route based on user state
      if (user) {
        console.log("User authenticated, routing to homepage...");
        router.replace("/homepage");
      } else {
        console.log("User not authenticated, routing to login...");
        router.replace("/");
      }
    }
  }, [loaded, isLoading, user]);

  if (isLoading || !loaded) {
    return null; // Show nothing while loading
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="createUsersAccount" />
        {user && <Stack.Screen name="homepage" />}
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
