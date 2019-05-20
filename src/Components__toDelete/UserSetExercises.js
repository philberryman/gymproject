import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { getProgramSets } from "../queries";
import AddTodos from "./AddTodos";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GetTodos = ({ match }) => {
  const programId = match.params.programId;
  const setId = match.params.setId;
  console.log(programId);
  console.log(setId);

  return (
    <Query query={getProgramSets} variables={{ id: programId }}>
      {({ loading, error, data }) => {
        console.log(data);
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
        if (data.user_program_sets.length === 0)
          return (
            <div>
              <h3>No Todos Created Yet</h3>
              <AddTodos />
            </div>
          );
        console.log("jdjdj");
        let count = 0;
        const sets = data.user_program_sets;

        console.log({ sets });
        console.log(setId);
        const set = sets.find(item => item.id === Number(setId));
        console.log(set);
        const exercises = set.user_set.user_set_exercises;
        console.log(exercises);

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
                  <ListGroup>
                    <ListGroupItem>
                      <AddTodos />
                    </ListGroupItem>
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

export default GetTodos;
