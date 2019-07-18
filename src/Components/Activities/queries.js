import gql from "graphql-tag";

export const GET_ACTIVITIES = gql`
  query activities {
    activities {
      name
      id
      exercise {
        name
      }
    }
  }
`;

export const CREATE_ACTIVITY = gql`
  mutation createActivity(
    $name: String!
    $description: String!
    $primaryExerciseId: Int!
  ) {
    insert_activities(
      objects: {
        name: $name
        description: $description
        primary_exercise_id: $primaryExerciseId
      }
    ) {
      returning {
        id
        date_added
      }
    }
  }
`;
