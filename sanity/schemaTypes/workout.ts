import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'workout',
  title: 'Workout',
  type: 'document',
  fields: [
    defineField({
      name: 'userId',
      title: 'User ID',
      type: 'string',
      description: 'Clerk userId',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'duration',
      title: 'Duration (seconds)',
      type: 'number',
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'exercises',
      title: 'Workout Exercises',
      type: 'array',
      of: [
        defineArrayMember({
            type: 'object',
            name: 'workoutExercise',
            title: 'Workout Exercise',
            fields: [
                defineField({
                    name: 'exercise',
                    title: 'Exercise',
                    type: 'reference',
                    to: [{ type: 'exercise' }],
                    validation: Rule => Rule.required()
                }),
                defineField({
                    name: 'sets',
                    title: 'Sets',
                    type: 'array',
                    of: [
                        defineArrayMember({
                            type: 'object',
                            name: 'set',
                            title: 'Set',
                            fields: [
                                defineField({
                                    name: 'reps',
                                    title: 'Reps',
                                    type: 'number',
                                    validation: Rule => Rule.required().min(1)
                                }),
                                defineField({
                                    name: 'weight',
                                    title: 'Weight',
                                    type: 'number',
                                    validation: Rule => Rule.required().min(0)
                                }),
                                defineField({
                                    name: 'weightUnit',
                                    title: 'Weight Unit',
                                    type: 'string',
                                    options: {
                                        list: [
                                            { title: 'Kilograms', value: 'kg' },
                                            { title: 'Pounds', value: 'lb' },
                                        ],
                                    },
                                    initialValue: 'kg',
                                    validation: Rule => Rule.required()
                                }),
                            ],
                            preview: {
                                select: {
                                    reps: 'reps',
                                    weight: 'weight',
                                    weightUnit: 'weightUnit'
                                },
                                prepare(selection) {
                                    const { reps, weight, weightUnit } = selection
                                    return {
                                        title: `Set - Reps: ${reps}, Weight: ${weight}${weightUnit}`
                                    }
                                }
                            }
                        })
                    ],
                    validation: Rule => Rule.required().min(1)
                }),
            ],
            preview: {
                select: {
                    exerciseName: 'exercise.name',
                    sets: 'sets'
                },
                prepare(selection) {
                    const { exerciseName, sets } = selection;
                    return {
                        title: exerciseName ?? 'Unnamed Exercise',
                        subtitle: `${sets ? sets.length : 0} set${sets && sets.length > 1 ? 's' : ''}`,
                    }
                }
            }
        }),
      ],
      validation: Rule => Rule.required().min(1)
    })
  ],
  preview: {
    select: {
      date: 'date',
      duration: 'duration',
      exercises: 'exercises',
    },
    prepare(selection) {
      const { date, duration, exercises } = selection
      const exerciseCount = exercises ? exercises.length : 0
      return {
        title: `Workout on ${date ? new Date(date).toLocaleDateString() : 'Unknown date'}`,
        subtitle: `${exerciseCount} exercise(s), Duration: ${duration || 0}s`
      }
    }
  }
})
