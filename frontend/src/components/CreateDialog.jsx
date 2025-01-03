import React from "react";
import createStyles from './cssModule/create.module.css';
const CreateDialog = ({ title, placeholder, value, setValue, onConfirm, onCancel }) => {
  return (
    <div className={createStyles.folderbox}>
      <h1>{title}</h1>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className={createStyles.btn}>
        <button onClick={onConfirm}>Done</button>
        <div className={createStyles.sep}></div>
        <button className= {createStyles.cancel} onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default CreateDialog;