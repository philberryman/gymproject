import React, { useState } from "react";
import { GET_EXERCISES } from "../../Queries/exercises";

export const ExerciseForm = ({ onSubmit, history }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: { name, description },
          refetchQueries: [{ query: GET_EXERCISES }],
        })
          .then(result => history.push(`/exercises/`))
          .catch(e => console.log(e));
      }}
    >
      <input
        onChange={e => setName(e.target.value)}
        type="text"
        placeholder="exercise name"
        value={name}
      />
      <input
        onChange={e => setDescription(e.target.value)}
        type="text"
        placeholder="exercise description"
        value={description}
      />
      <button>Submit</button>
    </form>
  );
};
