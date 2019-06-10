import React, { useState } from "react";
import { Query, Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import {
  CenteredContainer,
  UnstyledList,
  ActivitySetList,
  ActivityItem,
  ActivitySetItem,
  ActivityValue,
  SubHeader,
  ActivityHeader,
  ActivityName,
  OpenClose,
  SmallButton,
  UpDownArrow,
  DoneDelete,
} from "../Styles/styles.js";

import UpArrow from "../assets/chevron-up-solid.svg";
import DownArrow from "../assets/chevron-down-solid.svg";
import PlusCircle from "../assets/plus-circle-solid.svg";
import MinusCircle from "../assets/minus-circle-solid.svg";
import TrashBin from "../assets/trash-alt-solid.svg";
import EditSolid from "../assets/edit-solid.svg";
import CheckCircle from "../assets/check-circle-solid.svg";

import {
  GET_PROGRAM_ACTIVITIES,
  DELETE_PROGRAM_ACTIVITY,
  UPDATE_ACTIVITY_WEIGHT,
  UPDATE_ACTIVITY_REPS,
  UPDATE_ACTIVITY_SETS,
} from "../Queries/programActivities";

import { DELETE_PROGRAM, GET_PROGRAMS } from "../Queries/programs";

import { AddProgramActivity } from "./AddProgramActivity";

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
            <SubHeader> {programs[0].name}</SubHeader>
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

const RemoveFromProgram = ({ programSetId, programId }) => {
  return (
    <Mutation
      mutation={DELETE_PROGRAM_ACTIVITY}
      refetchQueries={[
        { query: GET_PROGRAM_ACTIVITIES, variables: { id: programId } },
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

const ProgramActivities = ({ programActivities, programId }) => {
  const [open, setOpen] = useState(null);
  return (
    <UnstyledList>
      {programActivities.map(programActivity => {
        return (
          <ActivityItem key={programActivity.id}>
            <ActivityHeader
              onClick={() =>
                setOpen(programActivity.id === open ? null : programActivity.id)
              }
              open={programActivity.id === open}
            >
              <ActivityName> {programActivity.activity.name}</ActivityName>
              <OpenClose>+</OpenClose>
            </ActivityHeader>
            {programActivity.id === open && (
              <ActivitySets
                activitySets={programActivity.activity.activity_sets}
              />
            )}
          </ActivityItem>
        );
      })}
      <AddProgramActivity
        programActivities={programActivities}
        programId={programId}
      />
    </UnstyledList>
  );
};

const ActivitySets = ({ activitySets }) => {
  const [openId, setOpenId] = useState("jj");
  const openActivity = id => setOpenId(id === openId ? null : id);

  return (
    <ActivitySetList>
      {activitySets.map(activitySet => {
        const open = openId === activitySet.id;

        return (
          <ActivitySetItem key={activitySet.id} open={open}>
            <ActivityDetail
              id={activitySet.id}
              field="weight"
              label="KG"
              value={activitySet.weight}
              open={open}
              updateMutation={UPDATE_ACTIVITY_WEIGHT}
            />
            <ActivityDetail
              id={activitySet.id}
              field="reps"
              label="rep"
              value={activitySet.reps}
              open={open}
              updateMutation={UPDATE_ACTIVITY_REPS}
            />
            <ActivityDetail
              id={activitySet.id}
              field="sets"
              label="set"
              value={activitySet.sets}
              open={open}
              updateMutation={UPDATE_ACTIVITY_SETS}
            />
            <DoneDelete>
              {open ? (
                <>
                  <div  onClick={() => openActivity(activitySet.id)}>
                    <img src={CheckCircle} alt="Done" height="22" width="22" />
                  </div>
                  <div>
                    <img src={TrashBin} alt="Delete" height="22" width="22" />
                  </div>
                </>
              ) : (
                <div onClick={() => openActivity(activitySet.id)}>
                  <img src={EditSolid} alt="Edit" height="20" width="20" />
                </div>
              )}
            </DoneDelete>
          </ActivitySetItem>
        );
      })}
    </ActivitySetList>
  );
};

const ActivityDetail = ({ id, field, label, value, open, updateMutation }) => (
  <div>
    {open && (
      <EditExerciseValue
        id={id}
        field={field}
        value={value}
        operator="plus"
        updateMutation={updateMutation}
      />
    )}
    <ActivityValue open={open}>
      {value} {value > 1 ? label + "s" : label}
    </ActivityValue>
    {open && (
      <EditExerciseValue
        id={id}
        field={field}
        value={value}
        operator="minus"
        updateMutation={updateMutation}
      />
    )}
  </div>
);

const EditExerciseValue = ({ id, field, value, operator, updateMutation }) => {
  const newValue = operator === "plus" ? value + 1 : value - 1;
  console.log(id);

  return (
    <Mutation
      mutation={updateMutation}
      refetchQueries={[
        {
          query: GET_PROGRAM_ACTIVITIES,
          variables: { id: 8 },
        },
      ]}
    >
      {updateValue => (
        <UpDownArrow
          onClick={() => {
            updateValue({ variables: { id: id, value: newValue } }).then(e =>
              console.log(e)
            );
          }}
        >
          {operator === "plus" ? (
            <img src={PlusCircle} alt="Plus" height="10" width="10" />
          ) : (
            <img src={MinusCircle} alt="Minus" height="10" width="10" />
          )}
        </UpDownArrow>
      )}
    </Mutation>
  );
};

const DeleteProgram = ({ program, history }) => {
  const onDelete = (programId, deleteProgram) => {
    console.log(programId);
    deleteProgram({
      variables: { programId },
    })
      .then(() => history.push(`/home`))
      .catch(e => console.log(e));
  };

  return (
    <Mutation
      mutation={DELETE_PROGRAM}
      refetchQueries={[{ query: GET_PROGRAMS }]}
    >
      {deleteProgram => (
        <button onClick={() => onDelete(program.id, deleteProgram)}>x</button>
      )}
    </Mutation>
  );
};

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
