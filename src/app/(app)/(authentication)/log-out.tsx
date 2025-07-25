import { useAuth } from "@clerk/clerk-expo";
import { Alert, TouchableOpacity, View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

function LogOut() {
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
    <View className="px-6 mb-8">
      <TouchableOpacity
        onPress={handleSignOut}
        className="bg-red-600 rounded-2xl p-4 shadow-sm"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-center">
          <Ionicons name="log-out-outline" size={20} color="white" />
          <Text className="text-white font-semibold text-lg ml-2">
            Sign Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default LogOut;
