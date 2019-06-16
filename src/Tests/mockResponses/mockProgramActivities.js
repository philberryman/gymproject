export const mockProgramActivities = {
  data: {
    program_activities: [
      {
        id: 5,
        program: {
          id: 1,
          __typename: "Program",
        },
        program_id: 1,
        activity: {
          id: 1,
          name: "Activity 1",
          activity_sets: [
            {
              exercise: {
                name: "exercise name",
                __typename: "Exercise",
              },
              id: 1,
              activity_id: 1,
              exercise_id: 1,
              reps: 10,
              rest: 60,
              sets: 4,
              type: "a type",
              weight: 50,
              order: 1,
              __typename: "ActivitySet",
            },
          ],
          __typename: "Activity",
        },
        __typename: "ProgramActivity",
      },
    ],
    programs: [
      {
        id: 1,
        name: "Program 1",
        __typename: "Program",
      },
    ],
  },
};

export const mockUserActivities = {
  data: {
    activities: [
      {
        id: 2,
        name: "Activity 2",
      },
    ],
  },
};
