import { GetWorkoutsQueryResult } from "./sanity/types";

const diffMapToColor = {
  beginner: "bg-green-500",
  intermediate: "bg-yellow-500",
  advanced: "bg-red-500",
  default: "bg-gray-500",
}

const diffMapToText = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  default: "Unknown",
}

const getDifficultyColor = (difficulty?: string) => (
  difficulty && ["beginner", "intermediate", "advanced"].includes(difficulty) ? diffMapToColor[difficulty] : diffMapToColor.default
);

const getDifficultyText = (difficulty: string) => (
  difficulty && ["beginner", "intermediate", "advanced"].includes(difficulty) ? diffMapToText[difficulty] : diffMapToText.default
);

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
        return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    }
};

const formatJoinedDate = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });
};

const formatDuration = (seconds: number): string => {
    if (seconds < 60) {
        return `${seconds}s`;
    }

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        if (remainingSeconds > 0) {
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        } else if (minutes > 0) {
            return `${hours}h ${minutes}m`;
        } else {
            return `${hours}h`;
        }
    } else {
        if (remainingSeconds > 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${minutes}m`;
        }
    }
}

  const getTotalSets = (workout: GetWorkoutsQueryResult[number]) => {
    return workout.exercises.reduce(
      (total, exercise) => total + (exercise.sets?.length || 0),
      0
    );
  };

export { getDifficultyColor, getDifficultyText, formatDate, formatDuration,  formatJoinedDate, getTotalSets };
