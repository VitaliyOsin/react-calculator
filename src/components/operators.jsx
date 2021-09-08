import React from "react";
import { opers } from "../utils/lists";

const Operators = ({ onOpBtn }) => {
  return (
    <div className="operators">
      {opers.map((op) => (
        <div key={op} onClick={onOpBtn}>
          {op}
        </div>
      ))}
    </div>
  );
};

export default Operators;
