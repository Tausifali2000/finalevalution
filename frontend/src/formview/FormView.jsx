import { useState, useEffect } from "react";
import Bubbles from "./components/Bubbles";
import InputForm from "./components/InputForm";
import styles from "./cssModules/formView.module.css";
import InputRating from "./components/InputRating.jsx";
import useFormStore from "../../store/form.js";
import { useParams } from 'react-router-dom';

export default function FormView() {
  const { formId } = useParams();
  const { fetchFormFromBackend } = useFormStore();
  const [form, setForm] = useState(null); 
  const [currentIndex, setCurrentIndex] = useState(0); // Track current index
  const [displayedElements, setDisplayedElements] = useState([]); // Keep track of displayed elements

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const formData = await fetchFormFromBackend(formId); // Fetch form data
        console.log(formData);
        setForm(formData); // Store the form data in state
      } catch (error) {
        console.error("Failed to fetch form:", error);
      }
    };

    fetchForm();
  }, [formId, fetchFormFromBackend]);

  useEffect(() => {
    if (form && currentIndex < form.element.length) { // Add null check for `form`
      const currentElement = form.element[currentIndex];

      // Automatically progress for "textBubble" and "imageBubble"
      if (currentElement.type === "textBubble" || currentElement.type === "imageBubble") {
        setDisplayedElements((prev) => [...prev, currentElement]); // Add the current element to displayed
        const timer = setTimeout(() => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 800); // Delay of 800ms for automatic progression
        return () => clearTimeout(timer); // Cleanup the timeout
      }

      // Stop progression for input types
      if (
        currentElement.type === "textInput" ||
        currentElement.type === "emailInput" ||
        currentElement.type === "ratingInput" ||
        currentElement.type === "phoneInput" ||
        currentElement.type === "dateInput" ||
        currentElement.type === "numberInput" ||
        currentElement.type === "buttonInput"
      ) {
        setDisplayedElements((prev) => [...prev, currentElement]); // Add the current element to displayed
      }
    }
  }, [form, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next component when user interacts
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        {form ? ( // Ensure `form` is not null before rendering
          displayedElements.map((element, index) => (
            <div key={`${element._id}-${index}`} className={styles.questionWrapper}>
              {element.type === "textBubble" && (
                <div className={styles.bubbleCon}>
                  <Bubbles content={element.content} />
                </div>
              )}
              {element.type === "ratingInput" && (
                <div className={styles.bubbleCon}>
                  <InputRating />
                </div>
              )}
              {element.type === "buttonInput" && (
                <div className={styles.bubbleCon}>
                  <button className={styles.inputButton}></button>
                </div>
              )}
              {element.type === "imageBubble" && (
                <div className={styles.bubbleCon}>
                  <Bubbles content={element.content} isImage={true} />
                </div>
              )}
              {element.type !== "textBubble" && element.type !== "imageBubble" && (
                <div className={styles.inputCon}>
                  <InputForm onSend={handleNext} inputType={element.type} />
                </div>
              )}
            </div>
          ))
        ) : (
          <div>Loading...</div> 
        )}
      </div>
    </div>
  );
}
