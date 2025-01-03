import React, { useState } from "react";
import styles from "./cssModules/inputRating.module.css";

const InputRating = () => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleRatingClick = (rating) => {
    if (!isSubmitted) {
      setSelectedRating(rating);
    }
  };

  const handleSubmit = () => {
    if (selectedRating) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      
      <div
        className={`${styles.ratingContainer} ${
          isSubmitted ? styles.submitted : ""
        }`}
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <button
            key={rating}
            className={`${styles.ratingButton} ${
              selectedRating === rating ? styles.selected : ""
            } ${isSubmitted && styles.disabled}`}
            onClick={() => handleRatingClick(rating)}
            disabled={isSubmitted}
          >
            {rating}
          </button>
        ))}
        </div>
        <div className={styles.btn}>
        <button
          className={`${styles.submitButton} ${
            !selectedRating ? styles.disabledSubmit : ""
          }`}
          onClick={handleSubmit}
          disabled={!selectedRating}
        >
         <img src="/send.png" alt="" />
        </button>
      
        </div>
       
    </div>
  );
};

export default InputRating;
