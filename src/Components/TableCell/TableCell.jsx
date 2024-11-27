import React from "react";
import "./tableCell.css";

const TableCell = ({ isEditing, value, onChange, type = "text" }) => {
  return (
    <td>
      {isEditing ? (
        <input
          type={type}
          className="form-control"
          value={value}
          onChange={onChange}
        />
      ) : (
        value
      )}
    </td>
  );
};

export default TableCell;
