import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../configs/firebase";

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsCollection = collection(db, "projects");
      const userIdQuery = where("userId", "==", "jlIFXIwyAL3tzHMtzRbw");
      const orderedQuery = orderBy("projectId");
      const combinedQuery = query(
        projectsCollection,
        userIdQuery,
        orderedQuery
      );

      try {
        const snapshot = await getDocs(combinedQuery);
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    fetchProjects();
  }, [projects]);

  return { projects, setProjects };
};
