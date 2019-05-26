import gql from "graphql-tag";

export const GET_PROGRAMS = gql`
  query programs {
    programs {
      id
      name
      user_id
    }
  }
`;

export const ADD_PROGRAM = gql`
  mutation addProgram($name: String!) {
    insert_programs(objects: { name: $name }) {
      returning {
        id
        name
        description
        user_id
      }
    }
  }
`;

export const DELETE_PROGRAM = gql`
  mutation deleteProgram($programId: Int!) {
    delete_programs(where: { id: { _eq: $programId } }) {
      affected_rows
    }
  }
`;
