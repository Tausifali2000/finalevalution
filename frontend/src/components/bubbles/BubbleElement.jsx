import React, { useState } from 'react';
import textBubble from './cssModules/text.module.css';

const BubbleElement = ({ 
  id, 
  label, 
  bubblecontent = '', 
  type = 'text', // Default to 'text', can also be 'image'
  updateLabel, 
  removeElement 
}) => {
  const [editableLabel, setEditableLabel] = useState(label);
  const [content, setContent] = useState(bubblecontent);

  const handleBlur = () => {
    updateLabel(editableLabel, content);
  };

  const getPlaceholder = () => {
    if (type === 'image') {
      return 'Click to add link';
    }
    return 'Click here to edit';
  };

  return (
    <div className={textBubble.bubble}>
      <button
        className={textBubble.bubbleButton}
        onClick={() => removeElement(id)}
      >
        <img className={textBubble.deleteIcon} src="/delete.png" alt="Delete" />
      </button>
      <form className={textBubble.form}>
        <input
          type="text"
          value={editableLabel}
          onChange={(e) => setEditableLabel(e.target.value)}
          onBlur={handleBlur}
          className={textBubble.inputLabel}
          placeholder={type === 'image' ? 'Edit label' : 'Edit label'}
        />
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={handleBlur}
          className={textBubble.inputField}
          placeholder={getPlaceholder()}
        />
      </form>
    </div>
  );
};

export default BubbleElement;
