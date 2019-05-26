import gql from "graphql-tag";

export const GET_SET_EXERCISES = gql`
  query set_exercises($setId: Int!) {
    set_exercises(where: { set_id: { _eq: $setId } }) {
      id
      set_id
      reps
      weight
      type
      rest
      exercise {
        id
        name
      }
    }
  }
`;

export const ADD_EXERCISE_TO_SET = gql`
  mutation insertSetExercises(
    $setId: Int!
    $exerciseId: Int!
    $weight: numeric!
    $reps: Int!
    $rest: Int!
    $type: String!
  ) {
    insert_set_exercises(
      objects: {
        set_id: $setId
        exercise_id: $exerciseId
        weight: $weight
        reps: $reps
        rest: $rest
        type: $type
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_SET_EXERCISE = gql`
  mutation deleteSetExercises($setExerciseId: Int!) {
    delete_set_exercises(where: { id: { _eq: $setExerciseId } }) {
      affected_rows
    }
  }
`;
