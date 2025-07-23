import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen
        name="workout-record"
        options={{
          headerShown: true,
          headerTitle: "Workout Record",
          headerBackTitle: "History",
        }}
      />
    </Stack>
  );
}
