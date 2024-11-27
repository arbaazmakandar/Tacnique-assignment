import React from "react";
import "./tableRow.css";
import TableCell from "../TableCell/TableCell";

const TableRow = ({
  user,
  isEditing,
  onEditChange,
  onEditSubmit,
  onEditClick,
  onDelete,
  updatedFirstName,
  updatedLastName,
  updatedEmail,
  updatedDepartment,
}) => {
  return (
    <tr key={user.id}>
      <TableCell isEditing={false} value={user.id} />
      <TableCell
        isEditing={isEditing}
        value={isEditing ? updatedFirstName : user.firstName}
        onChange={(e) => onEditChange("firstName", e.target.value)}
      />

      <TableCell
        isEditing={isEditing}
        value={isEditing ? updatedLastName : user.lastName}
        onChange={(e) => onEditChange("lastName", e.target.value)}
      />
      <TableCell
        isEditing={isEditing}
        value={isEditing ? updatedEmail : user.email}
        onChange={(e) => onEditChange("email", e.target.value)}
        type="email"
      />
      <TableCell
        isEditing={isEditing}
        value={isEditing ? updatedDepartment : user.department}
        onChange={(e) => onEditChange("department", e.target.value)}
      />
      <td>
        {isEditing ? (
          <button onClick={onEditSubmit} className="btn btn-success">
            Save
          </button>
        ) : (
          <>
            <button onClick={onEditClick} className="btn btn-warning">
              Edit
            </button>
            <button onClick={onDelete} className="btn btn-danger">
              Delete
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default TableRow;
