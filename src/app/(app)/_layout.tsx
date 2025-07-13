import { useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";

const Layout = () => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

  if (!isLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <Stack>
      <Stack.Protected guard={isSignedIn}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={!isSignedIn}>
        <Stack.Screen
          name="(authentication)/sign-in"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(authentication)/sign-up"
          options={{ headerShown: false }}
        />
      </Stack.Protected>
    </Stack>
  );
};

export default Layout;
