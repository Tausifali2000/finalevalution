import React, { useState } from 'react';
import inputStyles from './cssModules/input.module.css';

const InputElement = ({ id, type, label, removeElement, updateLabel }) => {
  const [editableLabel, setEditableLabel] = useState(label);

  const handleBlur = () => {
    updateLabel(editableLabel, null); 
  };

  
  const getHint = (type) => {
    switch (type) {
      case 'textInput':
        return 'Hint: User will enter text';
      case 'numberInput':
        return 'Hint: User will enter a number';
      case 'emailInput':
        return 'Hint: User will enter an email address';
      case 'phoneInput':
        return 'Hint: User will enter a phone number';
      case 'dateInput':
        return 'Hint: User will select the date';
      case 'ratingInput':
        return 'Hint: User will provide a rating';
      case 'buttonInput':
        return 'Hint: Enter button text value in label ';
      default:
        return 'Hint: Input type not recognized';
    }
  };

  return (
    <div className={inputStyles.input}>
      <button className={inputStyles.inputButton} onClick={() => removeElement(id)}>
      <img className={inputStyles.deleteIcon} src="/delete.png" alt="Delete" />
      </button>
      <input
        type="text"
        value={editableLabel}
        onChange={(e) => setEditableLabel(e.target.value)}
        onBlur={handleBlur}
        className={inputStyles.inputLabel}
        placeholder="Edit label"
      />
      <p className={inputStyles.hint}>{getHint(type)}</p>
    </div>
  );
};

export default InputElement;
