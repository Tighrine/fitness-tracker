import { defineQuery } from "groq";

const getWorkoutsQuery = defineQuery(`
  *[_type == "workout" && userId == $userId] | order(_createdAt desc) {
    _id,
    date,
    duration,
    exercises[] {
        exercise-> {
            _id,
            name
        },
        sets[] {
            reps,
            weight,
            weightUnit,
            _type,
            _key
        },
        _type,
        _key
      }
  }`);

const findExerciseQuery = defineQuery(`*[_type == "exercise" && name == $name][0] {
        _id,
        name
    }`);

const singleExerciseQuery = defineQuery(`*[_type == "exercise" && _id == $id][0]`);

const exercisesQuery = defineQuery(`*[_type == "exercise"] {
  ...
}`);

const getWorkoutRecordQuery =
  defineQuery(`*[_type == "workout" && _id == $workoutId][0] {
        _id,
        _type,
        _createdAt,
        date,
        duration,
        exercises[] {
            _type,
            _key,
            exercise-> {
                _id,
                name,
                description,
            },
            sets[] {
                reps,
                weight,
                weightUnit,
                _type,
                _key
            },
        },
        _type,
        _key
    }`);

export {
    getWorkoutsQuery,
    findExerciseQuery,
    singleExerciseQuery,
    exercisesQuery,
    getWorkoutRecordQuery
}