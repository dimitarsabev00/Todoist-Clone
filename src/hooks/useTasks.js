import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../configs/firebase";
import { collatedTasksExist } from "../utilities/helpers";
import moment from "moment";

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    let unsubscribe;

    const tasksCollection = collection(db, "tasks");
    const userIdQuery = where("userId", "==", "jlIFXIwyAL3tzHMtzRbw");
    const selectedProjectQuery =
      selectedProject && !collatedTasksExist(selectedProject)
        ? where("projectId", "==", selectedProject)
        : selectedProject === "TODAY"
        ? where("date", "==", moment().format("DD/MM/YYYY"))
        : selectedProject === "INBOX" || selectedProject === 0
        ? where("date", "==", "")
        : null;

    const combinedQuery = selectedProjectQuery
      ? query(tasksCollection, userIdQuery, selectedProjectQuery)
      : query(tasksCollection, userIdQuery);

    unsubscribe = onSnapshot(combinedQuery, (snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === "NEXT_7"
          ? newTasks.filter(
              (task) =>
                moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task) => task.archived !== true)
      );
      setArchivedTasks(newTasks.filter((task) => task.archived !== false));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};
