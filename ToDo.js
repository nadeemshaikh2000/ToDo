import React, { useState } from "react";
import "./todo.css";

const TodoApp = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [prevdata, setprevdata] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const handleValue = (event) => {
    setTaskTitle(event?.target?.value);
  };

  const handleAddButton = () => {
    if (taskTitle?.trim() === "") {
      alert("Title Should not be empty");
      return;
    }
    const protoObj = {
      title: taskTitle,
      isDone: isEdit ? prevdata?.isDone : false,
    };

    // console.log(protoObj);
    setTaskList((prevState) => [...prevState, protoObj]);
    setTaskTitle("");
    setIsEdit(false);
  };

  const handleDelete = (index) => {
    taskList.splice(index, 1);
    setTaskList(() => [...taskList]);
  };

  const handleStatus = (data, index) => {
    const protoObj = {
      title: data.title,
      isDone: !data?.isDone,
    };
    taskList.splice(index, 1, protoObj);
    setTaskList(() => [...taskList]);
  };

  const handleEdit = (data, index) => {
    taskList.splice(index, 1);
    setTaskList(() => [...taskList]);
    setTaskTitle(data?.title);
    setIsEdit(true);
    setprevdata(data);
  };

  return (
    <>
      <h1>Todo List</h1>
      <div>
        <input
          value={taskTitle}
          onChange={handleValue}
          type="text"
          placeholder="Add your task here...."
        />
        <button onClick={handleAddButton}>Add</button>
      </div>
      <div>
        {taskList.map((data, index) => {
          return (
            <div key={index} className={data.isDone ? "cardDone" : "card"}>
              <h2 className={data.isDone ? "cardTitleDone" : "cardTitle"}>
                {data?.title}
              </h2>
              <h2 className="deleteText" onClick={() => handleDelete(index)}>
                delete
              </h2>
              <h2
                className="deleteText"
                onClick={() => handleStatus(data, index)}
              >
                {data?.isDone ? "Not Completed" : "Completed"}
              </h2>
              <h2
                className="deleteText"
                onClick={() => handleEdit(data, index)}
              >
                Edit
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TodoApp;