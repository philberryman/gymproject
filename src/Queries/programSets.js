import gql from "graphql-tag";

export const GET_PROGRAM_SETS = gql`
  query programSets($id: Int!) {
    program_sets(where: { program_id: { _eq: $id } }) {
      id
      program_id
      set {
        id
        name
        set_exercises {
          id
          exercise {
            name
          }
          reps
          weight
        }
      }
    }
  }
`;

export const ADD_SET_TO_PROGRAM = gql`
  mutation insert_user_program_sets($programId: Int!, $setId: Int!) {
    insert_program_sets(objects: { program_id: $programId, set_id: $setId }) {
      returning {
        id
        program_id
        set {
          id
          name
          set_exercises {
            exercise {
              name
            }
            reps
            weight
          }
        }
      }
    }
  }
`;

export const GET_USER_SETS = gql`
  query userSets {
    sets {
      id
      name
    }
  }
`;
