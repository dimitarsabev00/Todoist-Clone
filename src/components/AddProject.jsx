/* eslint-disable react/prop-types */
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useProjectsValue } from "../context";
import { db } from "../configs/firebase";
import { generatePushId } from "../utilities/helpers";

const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();

  const addProject = () => {
    if (projectName) {
      addDoc(collection(db, "projects"), {
        projectId,
        name: projectName,
        userId: "jlIFXIwyAL3tzHMtzRbw",
      })
        .then(() => {
          setProjects([...projects]);
          setProjectName("");
          setShow(false);
        })
        .catch((error) => {
          console.error("Error adding project: ", error);
        });
    }
  };

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project__input" data-testid="add-project-inner">
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="add-project__name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project__submit"
            type="button"
            onClick={() => addProject()}
          >
            Add Project
          </button>
          <span
            aria-label="Cancel adding project"
            className="add-project__cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShow(false);
            }}
            role="button"
            tabIndex={0}
          >
            Cancel
          </span>
        </div>
      )}
      <span className="add-project__plus">+</span>
      <span
        aria-label="Add Project"
        className="add-project__text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
          if (e.key === "Enter") setShow(!show);
        }}
        role="button"
        tabIndex={0}
      >
        Add Project
      </span>
    </div>
  );
};

export default AddProject;
