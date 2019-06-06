import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import {
  CenteredContainer,
  UnstyledList,
  ProgramListItem,
  SetListItem,
  ExerciseListItem,
  UnStyledLink,
  SmallButton,
  ButtonGroup,
} from "../Styles/styles.js";

import { GET_PROGRAM_SETS, DELETE_PROGRAM_SET } from "../Queries/programSets";
import { AddProgramSet } from "./AddProgramSet";

const RemoveFromProgram = ({ programSetId, programId }) => {
  return (
    <Mutation
      mutation={DELETE_PROGRAM_SET}
      refetchQueries={[
        { query: GET_PROGRAM_SETS, variables: { id: programId } },
      ]}
    >
      {deleteProgramSet => (
        <button
          onClick={e => {
            e.stopPropagation();
            deleteProgramSet({ variables: { programSetId } });
          }}
        >
          Remove From Program
        </button>
      )}
    </Mutation>
  );
};

const SetsList = ({ sets, programId }) => {
  const [open, setOpen] = useState(null);
  console.log(sets);

  return (
    <UnstyledList>
      {sets.map(set => {
        {
          console.log(set);
        }
        return (
          <>
            <SetListItem onClick={() => setOpen(set.id)}>
              {set.set.name} //{" "}
              <RemoveFromProgram programSetId={set.id} programId={programId} />
            </SetListItem>
            {set.id === open && (
              <SetExercises setExercises={set.set.set_exercises} />
            )}
          </>
        );
      })}
      {open}
      <AddProgramSet programSets={sets} programId={programId} />
    </UnstyledList>
  );
};

const SetExercises = ({ setExercises }) => {
  console.log(setExercises[0]);
  return setExercises.map(item => (
    <ExerciseListItem>
      {item.exercise.name} -- {item.weight}kg x {item.reps} -- {item.rest} secs
      rest
    </ExerciseListItem>
  ));
};

export const ProgramSets = ({ match }) => {
  const programId = match.params.id;
  return (
    <Query query={GET_PROGRAM_SETS} variables={{ id: programId }}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return `Error! fetching todos.`;
        const sets = data.program_sets;
        if (sets.length === 0) {
          console.log("sets === 0");
          return (
            <div>
              <AddProgramSet programSets={sets} programId={programId} />
            </div>
          );
        }
        let count = 0;
        console.log(data);
        const currentProgram = data.programs[0];

        return (
          <CenteredContainer>
            <UnstyledList>
              <ProgramListItem>
                {currentProgram.name}
                <ButtonGroup>
                  <SmallButton background="#9EB8E3">
                    <UnStyledLink to={`/programs/${data.programs.id}`}>
                      View
                    </UnStyledLink>
                  </SmallButton>
                  <SmallButton background="#3DE27F">
                    <UnStyledLink to={`/programs/${data.programs.id}`}>
                      Do
                    </UnStyledLink>
                  </SmallButton>
                </ButtonGroup>
              </ProgramListItem>
            </UnstyledList>
            <SetsList sets={sets} programId={programId} />
          </CenteredContainer>
        );
      }}
    </Query>
  );
};

//   <div>
//   <Grid>
//     <Row>
//       <Col md={8} mdPush={2}>
//         <ListGroup>
//           {sets.map(set => (
//             <ListGroupItem key={set.id}>
//               {/* <ButtonG roup className="pull-right">
//                 <MarkTodo todo_id={todo.todo_id} />
//                 <DeleteTodo todo_id={todo.todo_id} />
//               </ButtonGroup> */}
//               <h4>
//                 {(count = count + 1)}.{" "}
//                 <Link to={`/programs/${programId}/${set.id}`}>
//                   {" "}
//                   {set.set.name}
//                 </Link>
//                 <RemoveFromProgram
//                   programSetId={set.id}
//                   programId={programId}
//                 />
//               </h4>
//             </ListGroupItem>
//           ))}
//         </ListGroup>
//         <>
//           <AddProgramSet programSets={sets} programId={programId} />
//         </>
//       </Col>
//     </Row>
//   </Grid>
// </div>
