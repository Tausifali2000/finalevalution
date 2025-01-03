import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useAuthStore } from "../../store/authUser.js";
import useWorkspaceStore from "../../store/share.js"; // Correct import for workspace store
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import dropStyles from "./dropdown";
import { useHomeStore } from "../../store/home.js";

const Dropdown = ({ username, onWorkspaceSelect }) => {
  const [selectedOption, setOption] = useState(null);
  const [isWorkspaceSelected, setIsWorkspaceSelected] = useState(false);
  const { logout } = useAuthStore();
  const { fetchAccessList, accessibleWorkspaces } = useWorkspaceStore();
  const { fetchHome } = useHomeStore();
  const navigate = useNavigate();
  const us = username + "'s Workspace";

  // Fetch workspaces on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchAccessList(); // Fetch initial workspaces
         // Fetch detailed workspace data
      } catch (error) {
        console.error("Error fetching workspaces:", error);
        // toast.error("Failed to load workspaces.");
      }
    };

    fetchData();
  }, [fetchAccessList]);

  // Transform workspaces into dropdown options
  const workspaceOptions = accessibleWorkspaces.map(({ id, ownerUsername, permission }) => ({
    value: id,
    label: ownerUsername || "Unnamed Workspace", // Handle missing names
    permission, // Include permission in the options
  }));
  

  // Default options
  const defaultOptions = [
   
    { value: "settings", label: "Settings" },
    { value: "logout", label: "Log Out" },
  ];
  const user = [
    { value: "currentUser", label:`${us}`},
  ]
  const handleDropdownChange = async (option) => {
    setOption(option);
  
    if (option.value === "logout") {
      await logout();
    } else if (option.value === "settings") {
      navigate("/home/settings");
    } else if (option.value === "currentUser") {
      setIsWorkspaceSelected(false);
      fetchHome(); // Fetch the current user's home data
      if (onWorkspaceSelect) {
        onWorkspaceSelect(null, false, null); // Indicate no workspace is selected
      }
    } else {
      const { value: workspaceId, permission } = option; // Extract workspaceId and permission
      setIsWorkspaceSelected(true);
      if (onWorkspaceSelect) {
        onWorkspaceSelect(workspaceId, true, permission); // Pass workspaceId and permission to parent
      }
    }
  };
  
  

  return (
    <div className="dropdown">
      <Select
        options={[...user, ...workspaceOptions, ...defaultOptions]} // Combine options
        value={selectedOption}
        placeholder={`${username}'s Workspace`}
        onChange={handleDropdownChange}
        styles={dropStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
      />
    </div>
  );
};

export default Dropdown;
