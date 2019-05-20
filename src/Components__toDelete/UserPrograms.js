import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";

import { getActivePrograms } from "../queries";

import { NewProgram } from "./NewProgram";
import { ListGroup, ListGroupItem, Grid, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const GetTodos = props => {
  return (
    //     <Query query={getIncompleteTodos}>
    //       {({ loading, error, data }) => {
    //         console.log(data);
    //         if (loading)
    //           return (
    //             <h2>
    //               Loading...{" "}
    //               <FontAwesomeIcon
    //                 icon={faSpinner}
    //                 style={{ color: "blue" }}
    //                 spin
    //               />
    //             </h2>
    //           );
    //         if (error) return `Error! fetching todos.`;
    //         if (data.todos.length === 0)
    //           return (
    //             <div>
    //               <h3>No Todos Created Yet</h3>
    //               <AddTodos />
    //             </div>
    //           );
    //         let count = 0;
    //         return (
    //           <div>
    //             <Grid>
    //               <Row>
    //                 <Col md={8} mdPush={2}>
    //                   <ListGroup>
    //                     {data.todos.map(todo => (
    //                       <ListGroupItem key={todo.todo_id}>
    //                         <ButtonGroup className="pull-right">
    //                           <MarkTodo todo_id={todo.todo_id} />
    //                           <DeleteTodo todo_id={todo.todo_id} />
    //                         </ButtonGroup>
    //                         <h4>
    //                           {(count = count + 1)}. {todo.todo_text}
    //                         </h4>
    //                       </ListGroupItem>
    //                     ))}
    //                   </ListGroup>
    //                   <ListGroup>
    //                     <ListGroupItem>
    //                       <AddTodos />
    //                     </ListGroupItem>
    //                   </ListGroup>
    //                 </Col>
    //               </Row>
    //             </Grid>
    //           </div>
    //         );
    //       }}
    //     </Query>

    <Query query={getActivePrograms}>
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
        if (data.user_programs.length === 0)
          return (
            <div>
              <h3>No Todos Created Yet</h3>
              <NewProgram />
            </div>
          );
        let count = 0;
        return (
          <div>
            <Grid>
              <Row>
                <Col md={8} mdPush={2}>
                  <ListGroup>
                    {data.user_programs.map(program => (
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
                      <NewProgram />
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
