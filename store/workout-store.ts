import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface WorkoutSet {
  id: string;
  reps: string;
  weight: string;
  weightUnit: "kg" | "lbs";
  isCompleted: boolean;
}

interface WorkoutExercise {
  id: string;
  sanityId: string; // Store the Sanity _id
  name: string;
  sets: WorkoutSet[];
}

interface WorkoutStore {
  workoutExercises: WorkoutExercise[];
  weightUnit: "kg" | "lbs";

  // Actions
  addExerciseToWorkout: (exercise: { name: string; sanityId: string }) => void;
  setWorkoutExercises: (
    exercises:
      | WorkoutExercise[]
      | ((prev: WorkoutExercise[]) => WorkoutExercise[])
  ) => void;
  setWeightUnit: (unit: "kg" | "lbs") => void;
  resetWorkout: () => void;
}

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set) => ({
      workoutExercises: [],
      weightUnit: "kg",
      addExerciseToWorkout: (exercise: { name: string; sanityId: string }) =>
        set((state) => ({
          workoutExercises: [
            ...state.workoutExercises,
            {
              id: Math.random().toString().slice(2),
              sanityId: exercise.sanityId,
              name: exercise.name,
              sets: [],
            },
          ],
        })),
      setWorkoutExercises: (exercises) =>
        set((state) => ({
          workoutExercises:
            typeof exercises === "function"
              ? exercises(state.workoutExercises)
              : exercises,
        })),
      setWeightUnit: (unit) =>
        set(() => ({
          weightUnit: unit,
        })),
      resetWorkout: () =>
        set(() => ({
          workoutExercises: [],
        })),
    }),
    {
      name: "workout-store",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        weightUnit: state.weightUnit,
      }),
    }
  )
);
