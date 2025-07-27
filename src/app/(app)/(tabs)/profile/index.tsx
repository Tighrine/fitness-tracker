import React, { use, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import LogOut from "@/app/(app)/(authentication)/log-out";
import { GetWorkoutsQueryResult } from "@/lib/sanity/types";
import { useUser } from "@clerk/clerk-expo";
import { client } from "@/lib/sanity/client";
import { getWorkoutsQuery } from "@/lib/sanity/queries";
import { formatDuration, formatJoinedDate } from "@/lib/helper";

export default function Profile() {
  const { user } = useUser();
  const [workouts, setWorkouts] = useState<GetWorkoutsQueryResult>([]);
  const [totalWorkouts, setTotalWorkouts] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [averageDuration, setAverageDuration] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (workouts.length === 0 && user?.id) {
      fetchWorkouts();
    }

    // Calculate stats
    setTotalWorkouts(workouts.length);
    setTotalDuration(
      workouts.reduce((sum, workout) => sum + (workout.duration || 0), 0)
    );
    setAverageDuration(
      totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0
    );
  }, [workouts, user?.id]);

  const fetchWorkouts = async () => {
    if (!user?.id) return;

    try {
      const results = await client.fetch(getWorkoutsQuery, { userId: user.id });
      setWorkouts(results);
    } catch (error) {
      console.log("Error while trying to get workouts: ", error);
    } finally {
      setLoading(false);
    }
  };

  const joinDate = user?.createdAt ? new Date(user.createdAt) : new Date();
  const daysSinceJoined = Math.floor(
    (new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="mt-4 text-lg text-gray-600">Loading profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-8 pb-6">
          <Text className="text-3xl font-bold text-gray-900">Profile</Text>
          <Text className="text-lg text-gray-600 mt-1">
            Manage your account and stats
          </Text>
        </View>

        {/* User Info Card */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-4">
              <View className="w-16 h-16 bg-blue-600 rounded-full items-center justify-center mr-4">
                <Image
                  source={{
                    uri: user.externalAccounts[0]?.imageUrl ?? user?.imageUrl,
                  }}
                  className="rounded-full"
                  style={{ width: 64, height: 64 }}
                />
              </View>
              <View className="flex-1">
                <Text className="text-xl font-semibold text-gray-900">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user?.firstName || "User"}
                </Text>
                <Text className="text-gray-600">
                  {user?.emailAddresses?.[0]?.emailAddress}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">
                  Member since {formatJoinedDate(joinDate)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-900 mb-4">
              Your fitness stats
            </Text>

            <View className="flex-row justify-between">
              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-blue-600">
                  {totalWorkouts}
                </Text>
                <Text className="text-sm text-center text-gray-600">
                  Total{"\n"}Workouts
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-green-600">
                  {formatDuration(totalDuration)}
                </Text>
                <Text className="text-sm text-center text-gray-600">
                  Total{"\n"}Time
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-2xl font-bold text-green-600">
                  {daysSinceJoined}
                </Text>
                <Text className="text-sm text-center text-gray-600">
                  Days{"\n"}Active
                </Text>
              </View>
            </View>
            {totalWorkouts > 0 && (
              <View className="mt-4 pt-4 border-t border-gray-100">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-600">
                    Average workout duration:
                  </Text>
                  <Text className="font-semibold text-gray-900">
                    {formatDuration(averageDuration)}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View className="px-6 mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-4">
            Account Settings
          </Text>
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="person-outline" size={20} color="#3B82F6" />
                </View>
                <Text className="text-gray-900 font-medium">Edit Profile</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center mr-3">
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color="#10B981"
                  />
                </View>
                <Text className="text-gray-900 font-medium">Notifications</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="settings-outline" size={20} color="#8B5CF6" />
                </View>
                <Text className="text-gray-900 font-medium">Settings</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-orange-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="help-circle-outline" size={20} color="#F59E0B" />
                </View>
                <Text className="text-gray-900 font-medium">Help & support</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>

        <LogOut />
      </ScrollView>
    </SafeAreaView>
  );
}
