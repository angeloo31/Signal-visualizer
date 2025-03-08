import React from "react";

const ButtonGrid = ({ addToFormula }) => {
  const buttons = [
    "sin",
    "cos",
    "tan",
    "exp",
    "log",
    "sqrt",
    "rect",
    "tri",
    "sinc",
    "u",
    "(",
    ")",
    "+",
    "-",
    "*",
    "/",
    "^",
    "t",
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mt-4 bg-gray-200 p-2">
      {buttons.map((btn) => (
        <button
          key={btn}
          onClick={() => addToFormula(btn)}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default ButtonGrid;
