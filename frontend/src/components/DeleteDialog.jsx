import React from "react";
import deletestyles from "./cssModule/delete.module.css";

const DeleteDialog = ({ type, onConfirm, onCancel }) => {
  return (
    <div className={deletestyles.box}>
      
        <h1>Are you sure you want to delete this {type}?</h1>
      
      <div className={deletestyles.btn}>
        <button onClick={onConfirm}>Confirm</button>
        <div className={deletestyles.sep}></div>
        <button className={deletestyles.cancel} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteDialog;
