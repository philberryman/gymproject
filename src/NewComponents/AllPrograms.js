import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { GET_PROGRAMS } from "../Queries/programs";

import { AddProgram } from "./AddProgram";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export const AllPrograms = props => {
  return (
    <Query query={GET_PROGRAMS}>
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
        if (data.programs.length === 0)
          return (
            <div>
              <h3>No Todos Created Yet</h3>
              <AddProgram />
            </div>
          );
        let count = 0;
        return (
          <div>
            <Grid>
              <Row>
                <Col md={8} mdPush={2}>
                  <ListGroup>
                    {data.programs.map(program => (
                      <ListGroupItem key={program.id}>
                        {/* <ButtonG roup className="pull-right">
                          <MarkTodo todo_id={todo.todo_id} />
                          <DeleteTodo todo_id={todo.todo_id} />
                        </ButtonGroup> */}
                        <h4>
                          {(count = count + 1)}.{" "}
                          <Link to={`/programs/${program.id}`}>
                            {" "}
                            {program.name}
                          </Link>
                        </h4>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <ListGroup>
                    <ListGroupItem>
                      <AddProgram />
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
