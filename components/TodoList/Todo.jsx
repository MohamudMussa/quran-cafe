import React from "react";

function Todo({ children }) {
  return (
    <div className="py-2 rounded-md glassmorphism my-1.5 px-3 flex justify-between text-xl items-center">
      {children}
    </div>
  );
}

export default Todo;
