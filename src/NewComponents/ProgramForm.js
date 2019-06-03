import React, { useState } from "react";
import { GET_PROGRAMS } from "../Queries/programs";

export const ProgramForm = ({ onSubmit }) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: { name },
          refetchQueries: [{ query: GET_PROGRAMS }],
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
        placeholder="program name"
        value={name}
      />
      <button>Submit</button>
    </form>
  );
};
