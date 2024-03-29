import React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { CenteredContainer, SubHeader, ProgramHeader } from "./styles.js";

import {
  GET_PROGRAM_ACTIVITIES,
  // DELETE_PROGRAM_ACTIVITY,
} from "../ProgramActivities/queries";

//  import { DELETE_PROGRAM, GET_PROGRAMS } from "../Queries/programs";

import { AddProgramActivity } from "../ProgramActivities/AddProgramActivity";
import { ProgramActivities } from "../ProgramActivities/ProgramActivities";

export const Program = ({ match, history }) => {
  const programId = match.params.id;
  return (
    <Query query={GET_PROGRAM_ACTIVITIES} variables={{ id: programId }}>
      {({ loading, error, data }) => {
        const { program_activities, programs } = data;
        if (loading) {
          return null;
        }
        if (error) return `Error! fetching todos.`;
        if (programs.length === 0) {
          return (
            <div>
              <AddProgramActivity
                programActivities={program_activities}
                programId={programId}
              />
            </div>
          );
        }

        return (
          <>
            <SubHeader> &lt; back</SubHeader>
            <ProgramHeader> {programs[0].name}</ProgramHeader>

            <CenteredContainer>
              <ProgramActivities
                programActivities={program_activities}
                programId={programId}
              />
              <Link to="/programs">Back</Link>
            </CenteredContainer>
          </>
        );
      }}
    </Query>
  );
};

// const RemoveFromProgram = ({ programSetId, programId }) => {
//   return (
//     <Mutation
//       mutation={DELETE_PROGRAM_ACTIVITY}
//       refetchQueries={[
//         { query: GET_PROGRAM_ACTIVITIES, variables: { id: programId } },
//       ]}
//     >
//       {deleteProgramSet => (
//         <button
//           onClick={e => {
//             e.stopPropagation();
//             deleteProgramSet({ variables: { programSetId } });
//           }}
//         >
//           Remove From Program
//         </button>
//       )}
//     </Mutation>
//   );
// };

// const DeleteProgram = ({ program, history }) => {
//   const onDelete = (programId, deleteProgram) => {
//     console.log(programId);
//     deleteProgram({
//       variables: { programId },
//     })
//       .then(() => history.push(`/home`))
//       .catch(e => console.log(e));
//   };

//   return (
//     <Mutation
//       mutation={DELETE_PROGRAM}
//       refetchQueries={[{ query: GET_PROGRAMS }]}
//     >
//       {deleteProgram => (
//         <button onClick={() => onDelete(program.id, deleteProgram)}>x</button>
//       )}
//     </Mutation>
//   );
// };

// const ProgramActivities = ({ programActivities, programId }) => {
//   const [open, setOpen] = useState(null);
//   return (
//     <UnstyledList>
//       {programActivities.map(programActivity => {
//         return (
//           <React.Fragment key={programActivity.id}>
//             <ActivityItem
//               onClick={() =>
//                 setOpen(programActivity.id === open ? null : programActivity.id)
//               }
//             >
//               {programActivity.activity.name}
//               <RemoveFromProgram
//                 programSetId={programActivity.id}
//                 programId={programId}
//               />
//             </ActivityItem>
//             {programActivity.id === open && (
//               <ActivitySets
//                 activitySets={programActivity.activity.activity_sets}
//               />
//             )}
//           </React.Fragment>
//         );
//       })}
//       <AddProgramActivity
//         programActivities={programActivities}
//         programId={programId}
//       />
//     </UnstyledList>
//   );
// };
