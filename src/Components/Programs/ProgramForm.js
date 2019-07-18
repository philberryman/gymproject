import React, { useState } from "react";
import { GET_PROGRAMS } from "./queries";

export const ProgramForm = ({ onSubmit, history }) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          variables: { name },
          refetchQueries: [{ query: GET_PROGRAMS }],
        })
          .then(result =>
            history.push(
              `/programs/${result.data.insert_programs.returning[0].id}`
            )
          )
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
