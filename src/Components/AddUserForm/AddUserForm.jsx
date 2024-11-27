import React from "react";
import "./addUserForm.css";

const AddUserForm = ({
  handleFormSubmit,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  department,
  setDepartment,
}) => {
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <h3>Add User</h3>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button type="submit">Add</button>
        <hr />
      </form>
    </div>
  );
};

export default AddUserForm;
