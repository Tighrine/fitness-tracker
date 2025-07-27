import { adminClient } from "@/lib/sanity/client";

export interface WorkoutData {
    _type: string;
    userId: string;
    date: string;
    duration: number;
    exercises: Array<{
        _type: string;
        _key: string;
        exercise: {
            _type: string;
            _ref: string;
        };
        sets: Array<{
            _type: string;
            _key: string;
            reps: number;
            weight: number;
            weightUnit: "lbs" | "kg";
        }>;
    }>;
}

export async function POST(req: Request) {
    const { workoutData }: { workoutData: WorkoutData } = await req.json();

    try {

        const result = await adminClient.create(workoutData);
        return Response.json({
            success: true,
            workoutId: result._id,
            message: "Workout saved successfully",
        });

    } catch(error) {
        console.error("error while saving workout: ", error);
        return Response.json({ error: "Failed to save workout" }, { status: 500 });
    }
}