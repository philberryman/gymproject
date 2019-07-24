// here's an extremely bare bones example of an autocomplete
import React from "react";
import Downshift from "downshift";

export const SelectExercise = ({
  items,
  setExercise,
  activityName,
  setActivityName,
}) => {
  return (
    <Downshift
      onChange={selection => {
        if (selection) {
          setExercise(selection);
          activityName === null && setActivityName(selection.name);
        } else {
          alert("selection cleared");
        }
      }}
      itemToString={item => (item ? item.name : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
      }) => (
        <div>
          <label {...getLabelProps()}>Select exercise : </label>
          <input {...getInputProps()} />
          <ul {...getMenuProps()}>
            {isOpen
              ? items
                  .filter(item => !inputValue || item.name.includes(inputValue))
                  .map((item, index) => (
                    <li
                      {...getItemProps({
                        key: item.name,
                        index,
                        item,
                        style: {
                          backgroundColor:
                            highlightedIndex === index ? "lightgray" : null,
                          fontWeight: selectedItem === item ? "bold" : "normal",
                        },
                      })}
                    >
                      {item.name}
                    </li>
                  ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};
