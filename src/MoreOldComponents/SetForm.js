import React, { useState } from "react";
import { GET_SETS } from "../Queries/sets";

export const SetForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: { name, description },
          refetchQueries: [{ query: GET_SETS }],
        })
          .then(() => {
            setName("");
          })
          .catch(e => console.log(e));
      }}
    >
      <input
        onChange={e => setName(e.target.value)}
        type="text"
        placeholder="set name"
        value={name}
      />
      <br />
      <input
        onChange={e => setDescription(e.target.value)}
        type="text"
        placeholder="description"
        value={description}
      />
      <button>Submit</button>
    </form>
  );
};
