import React from "react";
import { Tabs } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useUser } from "@clerk/clerk-expo";
import { Image } from "react-native";

export default function Layout() {
  const { user } = useUser();

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exercises"
        options={{
          title: "Exercises",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="book" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: "Workouts",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="pluscircle" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="clockcircleo" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color, size }) =>
            user.imageUrl ? (
              <Image
                source={{
                  uri: user?.imageUrl ?? user?.externalAccounts[0]?.imageUrl,
                }}
                className="rounded-full w-7 h-7"
              />
            ) : (
              <AntDesign name="playcircleo" color={color} size={size} />
            ),
        }}
      />
      <Tabs.Screen
        name="active-workout"
        options={{
          title: "Active Workout",
          href: null, // Prevents the tab from being rendered in the tab bar
        }}
      />
    </Tabs>
  );
}
