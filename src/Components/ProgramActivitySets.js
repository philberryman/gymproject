import React, { useState } from "react";
import { Mutation } from "react-apollo";

import {
  ActivitySetList,
  ActivitySetItem,
  ActivityValue,
  UpDownArrow,
  DoneDelete,
  AddSetLink,
  ActivityOrderButtons,
} from "../Styles/styles.js";

import PlusCircle from "../assets/plus-circle-solid.svg";
import MinusCircle from "../assets/minus-circle-solid.svg";
import TrashBin from "../assets/trash-alt-solid.svg";
import EditSolid from "../assets/edit-solid.svg";
import CheckCircle from "../assets/check-circle-solid.svg";
import ChevronUp from "../assets/chevron-up-solid.svg";
import ChevronDown from "../assets/chevron-down-solid.svg";

import {
  GET_PROGRAM_ACTIVITIES,
  UPDATE_ACTIVITY_WEIGHT,
  UPDATE_ACTIVITY_REPS,
  UPDATE_ACTIVITY_SETS,
  ADD_ACTIVITY_SET,
  ACTIVITY_SET_UPDATE_ORDER,
  DELETE_ACTIVITY_SET,
} from "../Queries/programActivities";

// Takes an array and a position (currentOrder) of an item you want to move and returns the order values of the elements before and after the current element. Or null if end of array. Assumes array is already ordered (which it is from gql query)
function newPosition(currentOrder, array) {
  const currentIndex = array.findIndex(item => item.order === currentOrder);
  const upPosition = currentIndex > 0 ? array[currentIndex - 1].order : null;
  const downPosition =
    currentIndex + 1 > array.length - 1 ? null : array[currentIndex + 1].order;
  const currentId = array[currentIndex].id;
  const upId = currentIndex > 0 ? array[currentIndex - 1].id : null;
  const downId =
    currentIndex + 1 > array.length - 1 ? null : array[currentIndex + 1].id;
  return { upPosition, downPosition, currentId, upId, downId };
}

export const ProgramActivitySets = ({ activitySets, programId }) => {
  const [openId, setOpenId] = useState("");
  const openActivity = id => setOpenId(id === openId ? null : id);

  const AddActivitySet = () => {
    const mostRecentActivity = activitySets[activitySets.length - 1];
    const {
      activity_id,
      exercise_id,
      weight,
      sets,
      reps,
      order,
    } = mostRecentActivity;

    const nextOrder = order + 1;
    return (
      <Mutation
        mutation={ADD_ACTIVITY_SET}
        refetchQueries={[
          {
            query: GET_PROGRAM_ACTIVITIES,
            variables: { id: programId },
          },
        ]}
      >
        {addSet => (
          <AddSetLink
            onClick={() => {
              addSet({
                variables: {
                  activityId: activity_id,
                  exerciseId: exercise_id,
                  weight,
                  sets,
                  reps,
                  nextOrder,
                },
              });
            }}
          >
            Add Set
          </AddSetLink>
        )}
      </Mutation>
    );
  };

  const ActivitySetOrder = ({ order, open, activitySetId, activitySet }) => {
    const { upPosition, downPosition, upId, downId, currentId } = newPosition(
      order,
      activitySets
    );

    return (
      <ActivityOrderButtons>
        {open && (
          <>
            <ActivityOrderUpDown
              activitySet={activitySet}
              currentPosition={order}
              direction="up"
              newPosition={upPosition}
              newId={upId}
              currentId={currentId}
            />
            <ActivityOrderUpDown
              activitySet={activitySet}
              currentPosition={order}
              direction="down"
              newPosition={downPosition}
              newId={downId}
              currentId={currentId}
            />
          </>
        )}
      </ActivityOrderButtons>
    );
  };

  const ActivityOrderUpDown = ({
    currentPosition,
    direction,
    newPosition,
    currentId,
    newId,
    activitySet,
  }) => {
    return (
      <UpDownArrow>
        {newPosition != null && (
          <Mutation
            mutation={ACTIVITY_SET_UPDATE_ORDER}
            refetchQueries={[
              {
                query: GET_PROGRAM_ACTIVITIES,
                variables: { id: programId },
              },
            ]}
          >
            {updateOrder => {
              return (
                <>
                  <img
                    onClick={() => {
                      updateOrder({
                        variables: {
                          id: activitySet.id,
                          activityId: activitySet.activity_id,
                          exerciseId: activitySet.exercise_id,
                          weight: activitySet.weight,
                          reps: activitySet.reps,
                          sets: activitySet.sets,
                          order: activitySet.order,
                          newOrder: newPosition,
                          switchId: newId,
                        },
                      });
                    }}
                    src={direction === "up" ? ChevronUp : ChevronDown}
                    alt="Plus"
                    height="22"
                    width="22"
                  />
                </>
              );
            }}
          </Mutation>
        )}
      </UpDownArrow>
    );
  };

  const ActivityDetail = ({
    id,
    field,
    label,
    value,
    open,
    updateMutation,
  }) => {
    return (
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
  };

  const EditExerciseValue = ({
    id,
    field,
    value,
    operator,
    updateMutation,
  }) => {
    const newValue = operator === "plus" ? value + 1 : value - 1;

    return (
      <Mutation
        mutation={updateMutation}
        refetchQueries={[
          {
            query: GET_PROGRAM_ACTIVITIES,
            variables: { id: programId },
          },
        ]}
      >
        {updateValue => (
          <UpDownArrow
            onClick={() => {
              updateValue({ variables: { id: id, value: newValue } });
            }}
          >
            {operator === "plus" ? (
              <img src={PlusCircle} alt="Plus" height="22" width="22" />
            ) : (
              <img src={MinusCircle} alt="Minus" height="22" width="22" />
            )}
          </UpDownArrow>
        )}
      </Mutation>
    );
  };

  return (
    <>
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
              <ActivitySetOrder
                activitySet={activitySet}
                activitySetId={activitySet.id}
                order={activitySet.order}
                open={open}
              />
              <DoneDelete>
                {open ? (
                  <>
                    <div onClick={() => openActivity(activitySet.id)}>
                      <img
                        src={CheckCircle}
                        alt="Done"
                        height="22"
                        width="22"
                      />
                    </div>
                    <Mutation
                      mutation={DELETE_ACTIVITY_SET}
                      refetchQueries={[
                        {
                          query: GET_PROGRAM_ACTIVITIES,
                          variables: { id: programId },
                        },
                      ]}
                    >
                      {deleteActivitySet => (
                        <div
                          onClick={() =>
                            deleteActivitySet({
                              variables: { id: activitySet.id },
                            })
                          }
                        >
                          <img
                            src={TrashBin}
                            alt="Delete"
                            height="22"
                            width="22"
                          />
                        </div>
                      )}
                    </Mutation>
                  </>
                ) : (
                  <div onClick={() => openActivity(activitySet.id)}>
                    <img src={EditSolid} alt="Edit" height="22" width="22" />
                  </div>
                )}
              </DoneDelete>
            </ActivitySetItem>
          );
        })}
      </ActivitySetList>
      <AddActivitySet />
    </>
  );
};
