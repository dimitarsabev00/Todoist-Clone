/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = async () => {
    try {
      const taskRef = doc(db, "tasks", id);
      await updateDoc(taskRef, {
        archived: true,
      });
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === "Enter") archiveTask();
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};

export default Checkbox;
