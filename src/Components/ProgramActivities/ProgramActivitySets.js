import React, { useState } from "react";
import { Mutation } from "react-apollo";
import Url from "url-parse";

import { ActivitySetItem, DoneDelete } from "./styles.js";

import { ActivityDetail } from "../ActivitySets/ActivityDetail";
import { ActivitySetOrder } from "../ActivitySets/ActivitySetOrder";
import { AddActivitySet } from "../ActivitySets/AddActivitySet";

import TrashBin from "../../assets/trash-alt-solid.svg";
import EditSolid from "../../assets/edit-solid.svg";
import CheckCircle from "../../assets/check-circle-solid.svg";

import {
  GET_PROGRAM_ACTIVITIES,
  UPDATE_ACTIVITY_WEIGHT,
  UPDATE_ACTIVITY_REPS,
  UPDATE_ACTIVITY_SETS,
  DELETE_ACTIVITY_SET,
} from "./queries";

export const ProgramActivitySets = ({ activitySets }) => {
  var currentUrl = new Url(window.location);
  const programId = Number(currentUrl.pathname.split("/")[2]);
  const [openId, setOpenId] = useState("");
  const openActivity = id => setOpenId(id === openId ? null : id);

  if (activitySets.length === 0) {
    return <p>Hello</p>;
  }

  return (
    <>
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
              activitySets={activitySets}
              activitySet={activitySet}
              activitySetId={activitySet.id}
              order={activitySet.order}
              open={open}
            />
            <DoneDelete>
              {open ? (
                <>
                  <div onClick={() => openActivity(activitySet.id)}>
                    <img src={CheckCircle} alt="Done" height="22" width="22" />
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
      <AddActivitySet activitySets={activitySets} />
    </>
  );
};
