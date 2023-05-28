/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useSelectedProjectValue } from "../context";
import { db } from "../configs/firebase";
import moment from "moment";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import ProjectOverlay from "./ProjectOverlay";
import TaskDate from "./TaskDate";

const AddTask = ({
  showAddTaskMain = true,
  shouldShowMain = false,
  showQuickAddTask,
  setShowQuickAddTask,
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(shouldShowMain);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = moment().format("DD/MM/YYYY");
    } else if (projectId === "NEXT_7") {
      collatedDate = moment().add(7, "days").format("DD/MM/YYYY");
    }

    return (
      task &&
      projectId &&
      addDoc(collection(db, "tasks"), {
        archived: false,
        projectId,
        task,
        date: collatedDate || taskDate,
        userId: "jlIFXIwyAL3tzHMtzRbw",
      })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain("");
          setShowProjectOverlay(false);
        })
        .catch((error) => {
          console.error("Error adding task: ", error);
        })
    );
  };

  return (
    <div
      className={showQuickAddTask ? "add-task add-task__overlay" : "add-task"}
    >
      {showAddTaskMain && (
        <div
          className="add-task__shallow"
          onClick={() => setShowMain(!showMain)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setShowMain(!showMain);
          }}
          tabIndex={0}
          aria-label="Add task"
          role="button"
        >
          <span className="add-task__plus">+</span>
          <span className="add-task__text">Add Task</span>
        </div>
      )}

      {(showMain || showQuickAddTask) && (
        <div className="add-task__main">
          {showQuickAddTask && (
            <>
              <div>
                <h2 className="header">Quick Add Task</h2>
                <span
                  className="add-task__cancel-x"
                  aria-label="Cancel adding task"
                  onClick={() => {
                    setShowMain(false);
                    setShowProjectOverlay(false);
                    setShowQuickAddTask(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setShowMain(false);
                      setShowProjectOverlay(false);
                      setShowQuickAddTask(false);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  X
                </span>
              </div>
            </>
          )}
          <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
          />
          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowTaskDate={setShowTaskDate}
          />
          <input
            className="add-task__content"
            aria-label="Enter your task"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            className="add-task__submit"
            onClick={() =>
              showQuickAddTask
                ? addTask().then(() => setShowQuickAddTask(false))
                : addTask()
            }
          >
            Add Task
          </button>
          {!showQuickAddTask && (
            <span
              className="add-task__cancel"
              onClick={() => {
                setShowMain(false);
                setShowProjectOverlay(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                }
              }}
              aria-label="Cancel adding a task"
              tabIndex={0}
              role="button"
            >
              Cancel
            </span>
          )}
          <span
            className="add-task__project"
            onClick={() => setShowProjectOverlay(!showProjectOverlay)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowProjectOverlay(!showProjectOverlay);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegListAlt />
          </span>
          <span
            className="add-task__date"
            onClick={() => setShowTaskDate(!showTaskDate)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowTaskDate(!showTaskDate);
            }}
            tabIndex={0}
            role="button"
          >
            <FaRegCalendarAlt />
          </span>
        </div>
      )}
    </div>
  );
};

export default AddTask;
