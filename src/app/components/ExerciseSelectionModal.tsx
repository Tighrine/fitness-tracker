import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkoutStore } from "store/workout-store";
import Ionicons from "@expo/vector-icons/Ionicons";
import ExerciseCard from "./exerciseCard";
import { Exercise, ExercisesQueryResult } from "@/lib/sanity/types";
import { client } from "@/lib/sanity/client";
import { exercisesQuery } from "@/app/(app)/(tabs)/exercises";

type ExerciseSelectionModal = {
  visible: boolean;
  onClose: () => void;
};

const ExerciseSelectionModal = (props: ExerciseSelectionModal) => {
  const { visible, onClose } = props;
  const router = useRouter();
  const { addExerciseToWorkout } = useWorkoutStore();
  const [exercises, setExercises] = useState<ExercisesQueryResult>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredExercises, setFilteredExercises] =
    useState<ExercisesQueryResult>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!visible) return;
    fetchExercises();
  }, [visible]);

  useEffect(() => {
    const filtered = exercises.filter((ex) =>
      ex.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchQuery, exercises]);

  const handleExercisePress = (exercise: Exercise) => {
    addExerciseToWorkout({ name: exercise.name, sanityId: exercise._id });
    onClose();
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExercises();
    setRefreshing(false);
  };

  const fetchExercises = async () => {
    try {
      const exercises = await client.fetch(exercisesQuery);
      setExercises(exercises);
      setFilteredExercises(exercises);
    } catch (error) {
      console.error("Error fetching exercises:", error);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        {/* Header */}
        <View
          className="bg-white px-4 pt-4 pb-6 shadow-sm border-b
border-gray-100"
        >
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-2xl font-bold text-gray-800">
              Add Exercise
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <Text className="text-gray-600 mb-4">
            Tap any exercise to add it to your workout
          </Text>
          {/* Search Bar */}
          <View
            className="flex-row items-center bg-gray-100 rounded-xl px-4
py-3"
          >
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-gray-800"
              placeholder="Search exercises..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Exercise List */}
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 16,
            paddingBottom: 32,
            paddingHorizontal: 16,
          }}
          renderItem={({ item }) => (
            <ExerciseCard
              item={item}
              onPress={() => handleExercisePress(item)}
              showChevron={false}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#3B82F6"]} // Android
              tintColor="#3B82F6" // iOS
              title="Pull to refresh exercises" // iOS
              titleColor="#6B7280" // iOS
            />
          }
          ListEmptyComponent={
            <View className="bg-white rounded-2xl p-8 items-center">
              <Ionicons name="fitness-outline" size={64} color="#9CA3AF" />
              <Text className="text-xl font-semibold text-gray-900 mt-4">
                {searchQuery ? "No exercises found" : "Loading exercises..."}
              </Text>
              <Text className="text-gray-600 text-center mt-2">
                {searchQuery
                  ? "Try adjusting your search"
                  : "Your exercises will appear here"}
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </Modal>
  );
};

export default ExerciseSelectionModal;
