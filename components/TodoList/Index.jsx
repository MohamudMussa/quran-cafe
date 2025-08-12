import React, { useEffect, useState } from "react";
import Todo from "./Todo";
// import Header from "./Header";
import { getCookie, setCookie } from "cookies-next";
import { ImCross } from "react-icons/im";

function TodoList() {
  const [todoList, setTodoList] = useState(getCookie("todos"));

  const [todo, setTodo] = useState({
    title: "",
    completed: false,
  });

  const handleSave = (e) => {
    e.preventDefault();

    if (todoList == undefined) {
      setTodoList([todo]);
    } else {
      setCookie("todos", [...todoList, todo]);
      setTodoList([...todoList, todo]);
    }
    setTodo({
      title: "",
      completed: false,
    });
  };

  const handleDelete = (index) => {
    let newTodoList = todoList.filter((item, i) => i !== index);
    setCookie("todos", newTodoList);
    setTodoList(newTodoList);
  };

  const handleComplete = (index) => {
    let newTodoList = todoList.map((item, i) => {
      if (i == index) {
        return {
          ...item,
          completed: !item.completed,
        };
      } else {
        return item;
      }
    });
    setCookie("todos", newTodoList);
    console.log("newTodoList", newTodoList);
    setTodoList(newTodoList);
  };

  useEffect(() => {
    if (todoList == undefined) {
      setCookie("todos", JSON.stringify([]));
    } else if (typeof todoList == "string") {
      let parsedTodoList = JSON.parse(todoList);
      setTodoList(parsedTodoList);
    }
  }, [todoList]);

  return (
    <div className="w-full min-w-0">
      {/* Match PrayerTime header style */}
      <div className="panel-header px-3 py-2 text-sm uppercase tracking-wide">Task List</div>
      <div className="p-3 panel-card-dark">
        <form onSubmit={handleSave} className="min-w-0">
          <input
            value={todo.title}
            onChange={(e) =>
              setTodo({
                title: e.target.value,
                completed: false,
              })
            }
            className="w-full bg-black text-white py-2 px-3 text-base mb-2 box-border min-w-0"
            placeholder="Type to add new task and press enter"
          />
        </form>
        {/* List */}
        <div className="overflow-y-auto" style={{ height: 192 }}>
          {typeof todoList !== "string" &&
            todoList?.map((item, index) => (
              <Todo key={index}>
                <input
                  type="checkbox"
                  className="mr-3 p-2 retro-check flex-shrink-0"
                  checked={item.completed}
                  onChange={() => handleComplete(index)}
                />
                <p className="text-base text-left flex-1 min-w-0 break-words">{item.title}</p>
                <ImCross onClick={() => handleDelete(index)} size={13} className="flex-shrink-0" />
              </Todo>
            ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
