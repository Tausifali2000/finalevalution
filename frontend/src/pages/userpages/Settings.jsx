import React, { useState } from "react";
import styles from "./cssModules/settings.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useHomeStore } from "../../../store/home.js";
import { useAuthStore } from "../../../store/authUser.js";

const Settings = () => {
  const { logout, user } = useAuthStore(); 
  const { updateUser } = useHomeStore(); 
  const navigate = useNavigate();

  const [name, setName] = useState( ""); 
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async () => {
    

    const userData = {
      username: name || undefined,
      email: email || undefined,
      oldPassword,
      newPassword: newPassword || undefined,
    };

    
      await updateUser(userData);
     setName("")
     setEmail("")
     setOldPassword("")
     setNewPassword('')
   
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully.");
    navigate("/login"); 
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Settings</h1>
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/name.png" alt="" />
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/password.png" alt="" />
          <input
            type="email"
            placeholder="Update Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/password.png" alt="" />
          <input
            type="password"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className={styles.input}
          />
          <img className={styles.eyeIcon} src="/view.png" alt="" />
        </div>
        <div className={styles.inputContainer}>
          <img className={styles.icon} src="/password.png" alt="" />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={styles.input}
          />
          <img className={styles.eyeIcon} src="/view.png" alt="" />
        </div>
        <button className={styles.updateButton} onClick={handleUpdate}>
          Update
        </button>
      </div>
      <button className={styles.logoutButton} onClick={handleLogout}>
        <img src="/Logout.png" alt="" />
        Log out
      </button>
    </div>
  );
};

export default Settings;
