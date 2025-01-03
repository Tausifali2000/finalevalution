import React, { useState } from 'react';
import inputStyles from './cssModules/input.module.css';

const InputStates = ({ type}) => {
  const [input, setInput] = useState("");

 

  // Define dynamic hints for different input types
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
        return 'Hint: User will select a button';
      default:
        return 'Hint: Input type not recognized';
    }
  };

  return (
    <div className={inputStyles.input}>
      <button className={inputStyles.inputButton} onClick={() => removeElement(id)}>
        X
      </button>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={handleBlur}
        placeholder="Edit label"
      />
      <p>{getHint(type)}</p>
    </div>
  );
};

export default InputStates;
