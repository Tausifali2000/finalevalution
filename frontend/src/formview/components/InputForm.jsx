import styles from "./cssModules/input.module.css";

const InputForm = ({ onSend, inputType }) => {
  let inputAttributes = {};

  switch (inputType) {
    case "textInput":
      inputAttributes = {
        type: "text",
        placeholder: "Enter your text",
      };
      break;
    case "emailInput":
      inputAttributes = {
        type: "email",
        placeholder: "Enter your email",
      };
      break;
    case "phoneInput":
      inputAttributes = {
        type: "tel",
        placeholder: "Enter your phone",
      };
      break;
    case "numberInput":
      inputAttributes = {
        type: "number",
        placeholder: "Enter a number",
      };
      break;
    default:
      inputAttributes = {
        type: "text",
        placeholder: "Enter your text",
      };
  }

  return (
    <div className={styles.container}>
      <input className={styles.input} {...inputAttributes} />
      <button className={styles.btn} onClick={onSend}>
        <img src="/send.png" alt="Send" />
      </button>
    </div>
  );
};

export default InputForm;
