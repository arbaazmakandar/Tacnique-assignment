import React, { useState, useEffect } from "react";
import axios from "axios";
import "./user.css";
import AddUserForm from "../AddUserForm/AddUserForm";
import TableRow from "../TableRow/TableRow";

const API = "https://jsonplaceholder.typicode.com/users";

function User() {
  const [editingUserId, setEditingUserId] = useState(0);
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedDepartment, setUpdatedDepartment] = useState("");
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    axios
      .get(API)
      .then((response) => {
        const formattedData = response.data.map((user) => ({
          id: user.id,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1] || "",
          email: user.email,
          department: "Department Name",
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        alert("Error Fetching data");
      });
  }, []);

  // Add a new user
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !department) {
      alert("All fields are required!");
      return;
    }

    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      phone: department,
    };
    axios
      .post(API, userData)
      .then((response) => {
        const formattedData = {
          id: response.data.id,
          firstName: response.data.name.split(" ")[0],
          lastName: response.data.name.split(" ")[1] || "",
          email: response.data.email,
          department: response.data.phone,
        };

        setData((prevData) => [...prevData, formattedData]);
        alert("User  added successfully!");
      })
      .catch((error) => {
        console.error("Error adding user:", error);
        alert("Error adding user");
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setDepartment("");
  };

  // Edit an existing user
  const handleEditClick = (user) => {
    setEditingUserId(user.id);
    setUpdatedFirstName(user.firstName);
    setUpdatedLastName(user.lastName);
    setUpdatedEmail(user.email);
    setUpdatedDepartment(user.department);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    // Check for required fields
    if (
      !updatedFirstName ||
      !updatedLastName ||
      !updatedEmail ||
      !updatedDepartment
    ) {
      alert("All fields are required!");
      return;
    }

    // Prepare the updated user data for the API
    const updatedUserData = {
      name: `${updatedFirstName} ${updatedLastName}`,
      email: updatedEmail,
      phone: updatedDepartment,
    };

    // Make the API call to update the user
    axios
      .put(`${API}/${editingUserId}`, updatedUserData)
      .then((response) => {
        const formattedData = {
          id: response.data.id,
          firstName: response.data.name.split(" ")[0],
          lastName: response.data.name.split(" ")[1] || "",
          email: response.data.email,
          department: response.data.phone,
        };

        setData((prevData) =>
          prevData.map((user) =>
            user.id === editingUserId ? formattedData : user
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        alert("Error updating user");
      });

    setEditingUserId(null);
    setUpdatedFirstName("");
    setUpdatedLastName("");
    setUpdatedEmail("");
    setUpdatedDepartment("");
  };
  // Delete a user
  const handleDelete = (id) => {
    axios
      .delete(`${API}/${id}`)
      .then(() => {
        setData((prevData) => prevData.filter((user) => user.id !== id));
        alert("User  deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user");
      });
  };
  const handleEditChange = (field, value) => {
    switch (field) {
      case "firstName":
        setUpdatedFirstName(value);
        break;
      case "lastName":
        setUpdatedLastName(value);
        break;
      case "email":
        setUpdatedEmail(value);
        break;
      case "department":
        setUpdatedDepartment(value);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <AddUserForm
        handleFormSubmit={handleFormSubmit}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        department={department}
        setDepartment={setDepartment}
      />

      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              user={user}
              isEditing={editingUserId === user.id}
              updatedFirstName={updatedFirstName}
              updatedLastName={updatedLastName}
              updatedEmail={updatedEmail}
              updatedDepartment={updatedDepartment}
              onEditChange={handleEditChange}
              onEditSubmit={handleEditSubmit}
              onEditClick={() => handleEditClick(user)}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default User;
