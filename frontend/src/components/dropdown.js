const dropStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent", // Dark background for consistency
    border: "1px solid #FFFFFF29",
    boxShadow: "none",
    cursor: "pointer",
    color: "white",
    padding: "5px",
    width: "292px", // Allow dynamic width
    maxWidth: "300px",
    height: "40px", // Restrict to a reasonable max width
    fontSize: "16px",
    textAlign: "center", // Align text to the left
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "14px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: "white",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#1a1a1a",
    border: "none",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    maxWidth: "300px", // Match dropdown width
  }),
  menuList: (provided) => ({
    ...provided,
    padding: "0",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor:
      state.isFocused && state.data.value !== "username" // Keep background color for focused state except for the "username" option
        ? "#333333"
        : state.data.value === "username" // Specific styling for the "username" option
        ? "#444444"
        : "#1a1a1a",
    color: state.data.value === "username" ? "#00bfff" : // Light blue for the "username" option
      state.data.value === "logout" ? "#ff8c00" : "white",
    fontSize: "14px",
    padding: "10px",
    cursor: "pointer",
    fontWeight: state.data.value === "logout" ? "bold" : "normal",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "white",
    fontSize: "14px",
  }),
};

export default dropStyles;
