import gql from "graphql-tag";

export const getAllTodos = gql`
  query allTodos {
    todos(order_by: { todo_id: asc, todo_mark: asc }) {
      todo_id
      todo_text
      todo_mark
      todo_user
    }
  }
`;

export const getIncompleteTodos = gql`
  query incompleteTodos {
    todos(where: { todo_mark: { _eq: false } }) {
      todo_id
      todo_text
      todo_mark
      todo_user
    }
  }
`;

export const getCompleteTodos = gql`
  query completeTodos {
    todos(where: { todo_mark: { _eq: true } }) {
      todo_id
      todo_text
      todo_mark
      todo_user
    }
  }
`;

export const addTodo = gql`
  mutation($todo_text: String!, $todo_user: String!) {
    insert_todos(objects: [{ todo_text: $todo_text, todo_user: $todo_user }]) {
      affected_rows
    }
  }
`;

export const markTodo = gql`
  mutation($todo_id: Int!) {
    update_todos(
      where: { todo_id: { _eq: $todo_id } }
      _set: { todo_mark: true }
    ) {
      affected_rows
    }
  }
`;

export const deleteTodo = gql`
  mutation($todo_id: Int!) {
    delete_todos(where: { todo_id: { _eq: $todo_id } }) {
      affected_rows
    }
  }
`;

export const getActivePrograms = gql`
  query activePrograms {
    programs(where: { active: { _eq: true } }) {
      id
      name
      user_id
    }
  }
`;

export const getProgramSets = gql`
  query programSets($id: Int!) {
    user_program_sets(where: { program_id: { _eq: $id } }) {
      id
      program_id
      user_set {
        id
        name
        user_set_exercises {
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

export const getSetExercises = gql`
  query programSets {
    user_programs(where: { id: { _eq: 3 } }) {
      user_program_sets {
        id
        user_set {
          name
          id
          user_set_exercises {
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
  }
`;

export const GET_USER_SETS = gql`
  query userSets {
    user_sets {
      id
      name
    }
  }
`;

export const ADD_SET_TO_PROGRAM = gql`
  mutation insert_user_program_sets($programId: Int!, $setId: Int!) {
    insert_user_program_sets(
      objects: { program_id: $programId, set_id: $setId }
    ) {
      returning {
        id
        program_id
        user_set {
          id
          name
          user_set_exercises {
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
