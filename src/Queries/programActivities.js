import gql from "graphql-tag";

export const GET_PROGRAM_ACTIVITIES = gql`
  query programSets($id: Int!) {
    program_activities(where: { program_id: { _eq: $id } }) {
      id
      program {
        id
      }
      program_id
      activity {
        id
        name
        activity_sets(order_by: { order: asc }) {
          exercise {
            name
          }
          id
          reps
          rest
          sets
          type
          weight
          order
        }
      }
    }
    programs(where: { id: { _eq: $id } }) {
      id
      name
    }
  }
`;

export const ADD_ACTIVITY_TO_PROGRAM = gql`
  mutation insert_user_program_sets($programId: Int!, $setId: Int!) {
    insert_program_activities(
      objects: { program_id: $programId, activity_id: $setId }
    ) {
      returning {
        id
        program_id
        activity {
          id
          name
          activity_sets {
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

export const GET_USER_ACTIVITIES = gql`
  query userSets {
    activities {
      id
      name
    }
  }
`;

export const DELETE_PROGRAM_ACTIVITY = gql`
  mutation deleteProgramSets($programSetId: Int!) {
    delete_program_activities(where: { id: { _eq: $programSetId } }) {
      affected_rows
    }
  }
`;
