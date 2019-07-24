import React, { useState } from "react";
import { GET_EXERCISES } from "../Exercises/queries";

import { Query } from "react-apollo";
import { SelectExercise } from "../Exercises/SelectExercise.js";

import { CenteredContainer } from "../../Styles/styles.js";
import { ActivityHeader } from "../ProgramActivities/styles.js";

import {
  InputLarge,
  InputSmall,
  FormInputs,
  Card,
  CardContent,
  ListDivider,
  InputLabel,
  ActivityExerciseSub,
} from "./styles.js";

export const ActivityForm = ({ onSubmit, history }) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState("");
  const [activityName, setActivityName] = useState(null);
  const [activitySets, setActivitySets] = useState([]);
  const [exercise, setExercise] = useState(null);

  const updateWeight = (value, index) => {
    const array = [...activitySets];
    array[index].weight = value;
    setActivitySets(array);
  };

  const updateReps = (value, index) => {
    const array = [...activitySets];
    array[index].reps = value;
    setActivitySets(array);
  };

  const updateSets = (value, index) => {
    const array = [...activitySets];
    array[index].sets = value;
    setActivitySets(array);
  };

  const addSet = (exercise, weight, reps, sets) => {
    const setObject = {
      exercise: exercise.id,
      exerciseName: exercise.name,
      weight: weight,
      reps: reps,
      sets: sets,
      index: Math.random(1000),
    };

    setActivitySets([...activitySets, setObject]);
    setWeight("");
    setReps("");
    setSets("");
  };

  // const moveItem = (oldIndex, positionChange) => {

  const moveItem = (oldIndex, positionChange) => {
    const array = [...activitySets];
    console.log(array);
    let newIndex = oldIndex + positionChange;
    if (newIndex >= array.length) {
      newIndex = array.length;
    }
    array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
    return array;
  };

  return (
    <CenteredContainer>
      <Card>
        {activityName && (
          <>
            <p>{activityName}</p>
            <button onClick={() => setExercise(null)}>Clear</button>
            <CardContent>
              {activitySets.map((activitySet, index) => {
                console.log(activitySets[index].exerciseName);

                return (
                  <>
                    <div key={activitySet.index}>
                      {/* shows exercise name once per group of same exercise */}

                      {index === 0 ? (
                        <ActivityExerciseSub>
                          {activitySets[index].exerciseName}
                        </ActivityExerciseSub>
                      ) : activitySets[index].exerciseName !==
                        activitySets[index - 1].exerciseName ? (
                        <ActivityExerciseSub>
                          {activitySets[index].exerciseName}
                        </ActivityExerciseSub>
                      ) : null}

                      <FormInputs>
                        <InputLarge
                          onChange={e => updateWeight(e.target.value, index)}
                          type="text"
                          placeholder="30"
                          value={activitySet.weight}
                        />{" "}
                        <InputLabel>KGs</InputLabel>
                        <InputSmall
                          onChange={e => updateReps(e.target.value, index)}
                          type="text"
                          placeholder="5"
                          value={activitySet.reps}
                        />
                        <InputLabel>Reps</InputLabel>
                        <InputSmall
                          onChange={e => updateSets(e.target.value, index)}
                          type="text"
                          placeholder="3"
                          value={activitySet.sets}
                        />
                        <InputLabel>Sets</InputLabel>
                        <button
                          onClick={() => setActivitySets(moveItem(index, -1))}
                        >
                          U
                        </button>
                        <button
                          onClick={() => setActivitySets(moveItem(index, 1))}
                        >
                          D
                        </button>
                        <button
                          onClick={() => setActivitySets(moveItem(index, 1))}
                        >
                          X
                        </button>
                      </FormInputs>
                    </div>
                  </>
                );
              })}
              <ListDivider />
              {exercise && (
                <>
                  <p>Add more sets</p> <br />
                  {exercise.name}
                  <FormInputs>
                    <InputLarge
                      onChange={e => setWeight(e.target.value)}
                      type="text"
                      placeholder="30"
                      value={weight}
                    />{" "}
                    <InputLabel>KGs</InputLabel>
                    <InputSmall
                      onChange={e => setReps(e.target.value)}
                      type="text"
                      placeholder="5"
                      value={reps}
                    />
                    <InputLabel>Reps</InputLabel>
                    <InputSmall
                      onChange={e => setSets(e.target.value)}
                      type="text"
                      placeholder="3"
                      value={sets}
                    />
                    <InputLabel>Sets</InputLabel>
                  </FormInputs>
                  <button onClick={() => addSet(exercise, weight, reps, sets)}>
                    Add Set
                  </button>
                </>
              )}
              <button>Submit</button>
            </CardContent>
          </>
        )}
        {exercise === null && (
          <Query query={GET_EXERCISES}>
            {({ loading, error, data }) => {
              if (loading) return <h2>Loading exercises</h2>;
              if (error) return `Error! fetching exercises.`;
              if (data.exercises.length === 0)
                return (
                  <div>
                    <h3>No Exercises Created Yet</h3>
                  </div>
                );
              return (
                <>
                  <p>Select an exercise</p>

                  <CardContent>
                    <SelectExercise
                      setExercise={setExercise}
                      items={data.exercises}
                      activityName={activityName}
                      setActivityName={setActivityName}
                    />
                  </CardContent>
                </>
              );
            }}
          </Query>
        )}
      </Card>
    </CenteredContainer>
  );
};
