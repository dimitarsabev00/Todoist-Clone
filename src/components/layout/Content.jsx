/* eslint-disable no-unused-vars */
import React from "react";
import Tasks from "../Tasks";
import Sidebar from "./Sidebar";

const Content = () => {
  return (
    <section className="content">
      <Sidebar />
      <Tasks />
    </section>
  );
};

export default Content;
