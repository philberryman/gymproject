import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_PROGRAM_SETS } from "../Queries/programSets";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const SetExercises = ({ match }) => {
  const programId = match.params.programId;
  const setId = match.params.setId;

  return (
    <Query query={GET_PROGRAM_SETS} variables={{ id: programId }}>
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

        console.log("jdjdj");
        let count = 0;
        const sets = data.program_sets;
        const set = sets.find(item => item.id === Number(setId));
        const exercises = set.set.set_exercises;
        if (exercises.length === 0)
          return (
            <div>
              <h3>No Excercises Created Yet</h3>
            </div>
          );
        return (
          <div>
            <Grid>
              <Row>
                <Col md={8} mdPush={2}>
                  <ListGroup>
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
                        </h4>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </Col>
              </Row>
            </Grid>
          </div>
        );
      }}
    </Query>
  );
};
