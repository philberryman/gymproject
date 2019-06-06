import gql from "graphql-tag";

export const GET_PROGRAM_SETS = gql`
  query programSets($id: Int!) {
    program_sets(where: { program_id: { _eq: 6 } }) {
      id
      program_id
      set {
        id
        name
        set_exercises {
          exercise {
            name
          }
          id
          reps
          rest
          weight
          type
        }
      }
    }
    programs(where: { id: { _eq: $id } }) {
      id
      name
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

export const DELETE_PROGRAM_SET = gql`
  mutation deleteProgramSets($programSetId: Int!) {
    delete_program_sets(where: { id: { _eq: $programSetId } }) {
      affected_rows
    }
  }
`;
