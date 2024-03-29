/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import moment from "moment";
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from "react-icons/fa";
const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) =>
  showTaskDate && (
    <div className="task-date">
      <ul className="task-date__list">
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().format("DD/MM/YYYY"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate(moment().format("DD/MM/YYYY"));
              }
            }}
            tabIndex={0}
            aria-label="Select today as the task date"
            role="button"
          >
            <span>
              <FaSpaceShuttle />
            </span>
            <span>Today</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, "day").format("DD/MM/YYYY"));
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Select tomorrow as the task date"
          >
            <span>
              <FaSun />
            </span>
            <span>Tomorrow</span>
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              setShowTaskDate(false);
              setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, "days").format("DD/MM/YYYY"));
              }
            }}
            aria-label="Select next week as the task date"
            tabIndex={0}
            role="button"
          >
            <span>
              <FaRegPaperPlane />
            </span>
            <span>Next week</span>
          </div>
        </li>
      </ul>
    </div>
  );

export default TaskDate;
