import gql from "graphql-tag";

export const GET_PROGRAMS = gql`
  query programs {
    programs(where: { active: { _eq: true } }) {
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
        active
        user_id
      }
    }
  }
`;
