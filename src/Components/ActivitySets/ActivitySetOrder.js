import React from "react";
import { ActivityOrderUpDown } from "./ActivityOrderUpDown";

import { ActivityOrderButtons } from "../../Styles/styles.js";

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

export const ActivitySetOrder = ({
  order,
  open,
  activitySetId,
  activitySet,
  activitySets,
}) => {
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
