import { Exercise } from "@/lib/sanity/types";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { urlFor } from "@/lib/sanity/client";
import Ionicons from "@expo/vector-icons/Ionicons";
import { getDifficultyColor, getDifficultyText } from "@/lib/helper";

type ExerciseCardProps = {
  item: Exercise;
  onPress: () => void;
  showChevron?: boolean;
};

const ExerciseCard = ({
  item,
  onPress,
  showChevron = true,
}: ExerciseCardProps) => {
  return (
    <TouchableOpacity
      className={`bg-white rounded-2xl shadow-sm mb-4 border border-gray-200`}
      onPress={onPress}
    >
      <View className="flex-row p-6">
        <View className="w-20 h-20 bg-white rounded-xl mr-4 overflow-hidden">
          {item.image ? (
            <Image
              source={{ uri: urlFor(item.image?.asset?._ref).url() }}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 items-center justify-center">
              <Ionicons name="fitness" size={24} color="white" />
            </View>
          )}
        </View>
        <View className="flex-1 justify-between">
          <View>
            <Text className="text-lg font-bold text-gray-900 mb-1">
              {item.name}
            </Text>
            <Text className="text-sm text-gray-600 mb-2" numberOfLines={2}>
              {item.description || "No description available"}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            {/* Badge de difficulté */}
            <View
              className={`px-3 py-1 rounded-full ${getDifficultyColor(
                item.difficulty
              )}`}
            >
              <Text className="text-xs font-semibold text-white">
                {getDifficultyText(item.difficulty)}
              </Text>
            </View>

            {/* Chevron (flèche) conditionnel */}
            {showChevron && (
              <TouchableOpacity className="p-2">
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ExerciseCard;
