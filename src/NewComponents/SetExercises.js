import React from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_SET_EXERCISES } from "../Queries/setExercises";
import { DELETE_SET_EXERCISE } from "../Queries/setExercises";
import { AddSetExercise } from "./AddSetExercise";

import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const onDelete = (setExerciseId, deleteSetExercise) => {
  deleteSetExercise({
    variables: { setExerciseId },
  });
};

export const SetExercises = ({ match }) => {
  const setId = match.params.setId;

  return (
    <Query query={GET_SET_EXERCISES} variables={{ setId: setId }}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <h2>
              Loading...{" "}
              <FontAwesomeIcon
                icon={faSpinner}
                style={{ color: "blue" }}
                spin
              />
            </h2>
          );
        if (error) return `Error! fetching todos.`;

        let count = 0;
        const exercises = data.set_exercises;
        console.log(data);
        console.log(exercises);

        if (exercises.length === 0)
          return (
            <div>
              <h3>No Excercises Created Yet</h3>
              <AddSetExercise setId={setId} />
            </div>
          );
        return (
          <div>
            <Grid>
              <Row>
                <Col md={8} mdPush={2}>
                  <ListGroup>
                    {console.log(exercises[0])}
                    {exercises.map(item => (
                      <ListGroupItem key={item.id}>
                        {/* <ButtonG roup className="pull-right">
                          <MarkTodo todo_id={todo.todo_id} />
                          <DeleteTodo todo_id={todo.todo_id} />
                        </ButtonGroup> */}
                        <h4>
                          {(count = count + 1)}. {console.log(item)}
                          <Link to={`/sets-${item.id}`}>
                            {" "}
                            {item.exercise.name} x {item.reps} ({item.weight}{" "}
                            kgs)
                          </Link>
                          <Mutation
                            mutation={DELETE_SET_EXERCISE}
                            refetchQueries={[
                              {
                                query: GET_SET_EXERCISES,
                                variables: { setId },
                              },
                            ]}
                          >
                            {deleteSetExercise => (
                              <button
                                onClick={() =>
                                  onDelete(item.id, deleteSetExercise)
                                }
                              >
                                Delete
                              </button>
                            )}
                          </Mutation>
                        </h4>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Grid>
            <AddSetExercise setId={setId} />
          </div>
        );
      }}
    </Query>
  );
};
