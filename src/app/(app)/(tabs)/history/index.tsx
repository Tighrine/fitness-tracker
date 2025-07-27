import { client } from "@/lib/sanity/client";
import { GetWorkoutsQueryResult } from "@/lib/sanity/types";
import { useClerk } from "@clerk/clerk-expo";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { formatDate, formatDuration, getTotalSets } from "@/lib/helper";
import { getWorkoutsQuery } from "@/lib/sanity/queries";

export default function HistoryPage() {
  const { user } = useClerk();
  const router = useRouter();
  const { refresh } = useLocalSearchParams();
  const [workouts, setWorkouts] = React.useState<GetWorkoutsQueryResult>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    if (!user.id) return;

    try {
      const results = await client.fetch(getWorkoutsQuery, {
        userId: user.id,
      });
      setWorkouts(results);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Handle refresh parameter from deleted workout
  useFocusEffect(
    useCallback(() => {
      // This is the logic you want to run when the user returns to the screen.
      // In your case, it's fetching the workouts again to get the latest data.
      fetchWorkouts();

      // You can return a cleanup function if needed, but it's often not for this use case.
      return () => {
        // console.log("History screen blurred");
      };
    }, []) // Re-run the effect if the fetchWorkouts function changes
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchWorkouts();
  };

  const formatWorkoutDuration = (seconds?: number) => {
    if (!seconds) return "Duration not recorded";
    return formatDuration(seconds);
  };

  const getExerciseNames = (workout: GetWorkoutsQueryResult[number]) => {
    return (
      workout.exercises?.map((ex) => ex.exercise?.name).filter(Boolean) || []
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="px-6 py-4 bg-white border-b border-gray-200">
          <Text className="text-2xl font-bold text-gray-900">
            Workout History
          </Text>
        </View>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3B82F6" />
          <Text className="text-gray-600 mt-4">Loading your workouts...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">
          Workout History
        </Text>
        <Text className="text-gray-600 mt-1">
          {workouts.length} workout{workouts.length > 1 ? "s" : ""} completed
        </Text>
      </View>
      {/* Workouts List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {workouts.length === 0 ? (
          <View className="bg-white rounded-2xl p-8 items-center">
            <Ionicons name="barbell-outline" size={64} color="#9CA3AF" />
            <Text className="text-xl font-semibold text-gray-900 mt-4">
              No workouts yet
            </Text>
            <Text className="text-gray-600 text-center mt-2">
              Your completed workouts will appear here
            </Text>
          </View>
        ) : (
          <View className="space-y-4 gap-4">
            {workouts.map((workout) => (
              <TouchableOpacity
                key={workout._id}
                className="bg-white rounded-2xl p-6 shadow-sm 
                            border border-gray-100"
                activeOpacity={0.7}
                onPress={() => {
                  router.push({
                    pathname: "/history/workout-record",
                    params: {
                      workoutId: workout._id,
                    },
                  });
                }}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-900">
                      {formatDate(workout.date || "")}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text className="text-gray-600 ml-2">
                        {formatWorkoutDuration(workout.duration)}
                      </Text>
                    </View>
                  </View>
                  <View className="bg-blue-100 rounded-full w-12 h-12 items-center justify-center">
                    <Ionicons
                      name="fitness-outline"
                      size={24}
                      color="#3B82F6"
                    />
                  </View>
                </View>
                {/* Workout Stats */}
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <View className="bg-gray-100 rounded-lg px-3 py-2 mr-3">
                      <Text className="text-sm font-medium text-gray-700">
                        {workout.exercises?.length || 0} exercises
                      </Text>
                    </View>
                    <View className="bg-gray-100 rounded-lg px-3 py-2">
                      <Text className="text-sm font-medium text-gray-700">
                        {getTotalSets(workout)} sets
                      </Text>
                    </View>
                  </View>
                </View>

                {workout.exercises && workout.exercises.length > 0 && (
                  <View className="mb-4">
                    <Text className="text-sm font-medium text-gray-700 mb-2">
                      Exercises:
                    </Text>
                    <View className="flex-row flex-wrap">
                      {getExerciseNames(workout)
                        .slice(0, 3)
                        .map((name, index) => (
                          <View
                            key={index}
                            className="bg-blue-50 rounded-lg px-3 py-1 mr-2 mb-2"
                          >
                            <Text className="text-blue-700 text-sm font-medium">
                              {name}
                            </Text>
                          </View>
                        ))}
                      {getExerciseNames(workout).length > 3 && (
                        <View className="bg-gray-100 rounded-lg px-3 py-1 mr-2 mb-2">
                          <Text className="text-gray-600 text-sm font-medium">
                            +{getExerciseNames(workout).length - 3} more
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
