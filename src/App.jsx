/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import { useSelector } from "react-redux";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { useState } from "react";

const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);

  const testState = useSelector(({ generalSlice }) => generalSlice.testState);
  console.log(testState);
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main className={darkMode ? "darkmode" : undefined}>
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

export default App;
