/* eslint-disable no-unused-vars */
import React from "react";
import Header from "./components/layout/Header";
import Content from "./components/layout/Content";
import { useSelector } from "react-redux";

const App = () => {
  const testState = useSelector(({ generalSlice }) => generalSlice.testState);
  console.log(testState);
  return (
    <>
      <Header />
      <Content />
    </>
  );
};

export default App;
