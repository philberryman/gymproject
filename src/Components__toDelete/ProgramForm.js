import React, { useState } from "react";
import { getActivePrograms } from "../queries";

export const ProgramForm = ({ onSubmit }) => {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log(name);
        onSubmit({
          variables: { name },
          refetchQueries: [{ query: getActivePrograms }],
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
        placeholder="title"
        value={name}
      />
      <button>Submit</button>
    </form>
  );
};
