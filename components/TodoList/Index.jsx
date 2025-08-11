import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Header from "./Header";
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
    <div className="flex overflow-hidden flex-col w-full" style={{ width: 320 }}>
      <Header />
      <form onSubmit={handleSave}>
        <input
          value={todo.title}
          onChange={(e) =>
            setTodo({
              title: e.target.value,
              completed: false,
            })
          }
          className="w-full bg-black text-white py-2 px-3 text-lg mb-2"
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
                className="mr-3 p-2 retro-check"
                checked={item.completed}
                onChange={() => handleComplete(index)}
              />
              <p className="text-xl text-left w-full">{item.title}</p>
              <ImCross onClick={() => handleDelete(index)} size={13} />
            </Todo>
          ))}
      </div>
    </div>
  );
}

export default TodoList;
