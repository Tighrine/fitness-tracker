const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-500";
    case "intermediate":
      return "bg-yellow-500";
    case "advanced":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
    default:
      return "Unknown";
  }
};

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

export { getDifficultyColor, getDifficultyText, formatDate, formatDuration };
