import gql from "graphql-tag";

export const GET_EXERCISES = gql`
  query exercises {
    exercises {
      id
      name
      description
    }
  }
`;

export const CREATE_EXERCISE = gql`
  mutation addExercise($name: String!, $description: String!) {
    insert_exercises(objects: { name: $name, description: $description }) {
      returning {
        id
        name
        description
      }
    }
  }
`;

export const DELETE_EXERCISE = gql`
  mutation deleteExercise($exerciseId: Int!) {
    delete_exercises(where: { id: { _eq: $exerciseId } }) {
      affected_rows
    }
  }
`;
