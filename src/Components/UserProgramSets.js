import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { getProgramSets } from "../queries";
import { AddSet } from "./AddSet";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GetTodos = ({ match }) => {
  const programId = match.params.id;
  console.log(programId);
  return (
    <Query query={getProgramSets} variables={{ id: programId }}>
      {({ loading, error, data }) => {
        const sets = data.user_program_sets;

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
        if (sets.length === 0)
          return (
            <div>
              <AddSet programSets={sets} programId={programId} />
            </div>
          );
        let count = 0;
        return (
          <div>
            <Grid>
              <Row>
                <Col md={8} mdPush={2}>
                  <ListGroup>
                    {sets.map(set => (
                      <ListGroupItem key={set.id}>
                        {/* <ButtonG roup className="pull-right">
                          <MarkTodo todo_id={todo.todo_id} />
                          <DeleteTodo todo_id={todo.todo_id} />
                        </ButtonGroup> */}
                        <h4>
                          {(count = count + 1)}.{" "}
                          <Link to={`/programs/${programId}/${set.id}`}>
                            {" "}
                            {set.user_set.name}
                          </Link>
                        </h4>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <ListGroup>
                    <ListGroupItem>
                      <AddSet programSets={sets} programId={programId} />
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
