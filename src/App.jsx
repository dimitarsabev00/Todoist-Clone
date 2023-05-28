/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import { useSelector } from "react-redux";
import { ProjectsProvider, SelectedProjectProvider } from "./context";

const App = () => {
  const testState = useSelector(({ generalSlice }) => generalSlice.testState);
  console.log(testState);
  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <main>
          <Header />
          <Content />
        </main>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};

export default App;
