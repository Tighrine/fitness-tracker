import React from "react";
import {
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAuth } from "@clerk/clerk-expo";
import LogOut from "../../(authentication)/log-out";

export default function Profile() {
  const { signOut } = useAuth();
  const handleSignOut = async () => {
    try {
      Alert.alert(
        "Sign Out",
        "Are you sure you want to sign out?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Sign Out",
            onPress: () => signOut(),
            style: "destructive",
          },
        ],
        { cancelable: true }
      );
      // Sign out logic here, e.g., using Clerk's signOut method
      // await signOut();
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView className="flex flex-1">
      <Text>Profile</Text>
      <LogOut />
    </SafeAreaView>
  );
}
