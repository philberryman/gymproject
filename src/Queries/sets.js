import gql from "graphql-tag";

export const GET_SETS = gql`
  query sets {
    sets {
      id
      name
      description
    }
  }
`;

export const ADD_SET = gql`
  mutation addSet($name: String!, $description: String!) {
    insert_sets(objects: { name: $name, description: $description }) {
      returning {
        id
        name
        description
      }
    }
  }
`;

export const DELETE_SET = gql`
  mutation deletesets($setId: Int!) {
    delete_sets(where: { id: { _eq: $setId } }) {
      affected_rows
    }
  }
`;
