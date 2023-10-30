import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { EditUserApi } from "../../Redux/extraReducer";

function ProfileEdit({ editedData, setVisibleEditModal, setEditedData }) {
  const dispatch = useDispatch();
  let appUser;
  appUser = JSON.parse(localStorage.getItem("appUser"));
  const handleChange = (event) => {
    setEditedData({ ...editedData, [event.target.name]: event.target.value });
  };
  const handleUpdateUser = () => {
    dispatch(EditUserApi(editedData));
    appUser.name = editedData.name;
    appUser.fullName = editedData.fullName;
    localStorage.setItem("appUser", JSON.stringify(appUser));
    window.location.reload();
  };
  return (
    <div className="edit-user">
      <div className="edit-user-content">
        <h2 className="title">Edit User</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter UserName"
          onChange={(e) => handleChange(e)}
          value={editedData.name}
        />
        <input
          type="text"
          name="fullName"
          placeholder="Enter FullName"
          onChange={(e) => handleChange(e)}
          value={editedData.fullName}
        />
        <div className="buttons">
          <button onClick={() => setVisibleEditModal(false)}>Cancel</button>
          <button onClick={handleUpdateUser}>Coniform</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
