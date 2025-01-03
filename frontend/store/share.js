import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useWorkspaceStore = create((set, get) => ({
  isLoadingWorkspace: false,
  workspaceOwner: null,
  accessibleWorkspaces: [],
  folders: [],
  forms: [],
 shareWorkspace: async (emailToShareWith, permission) => {
    try {
      const email = emailToShareWith
      const response = await axios.post(
        "/api/workspace/share", // Adjust the URL based on your API
        { email, permission },
        { withCredentials: true }
      );

      if (response.data.success) {
        toast.success("Workspace shared successfully");
      } else {
        toast.error(response.data.message || "Failed to share workspace");
      }

      return response.data; // Return the backend response
    } catch (error) {
      console.error("Failed to share workspace:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  fetchAccessList: async () => {
    try {
      const response = await axios.get("/api/workspace/accesslist", {
        withCredentials: true,
      });

      if (response.data.success) {
        // Store the accessible workspaces in the state
        set({ accessibleWorkspaces: response.data.workspaces });
       
      } else {
        toast.error(response.data.message || "Failed to fetch access list");
      }

      return response.data.workspaces; // Return the fetched workspaces
    } catch (error) {
      console.error("Failed to fetch access list:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  fetchWorkspace: async (workspaceId) => {
    set({ isLoadingWorkspace: true });
    try {
      const response = await axios.get(`/api/workspace/${workspaceId}`, {
        withCredentials: true,
      });
      const show = response.data.data;
      console.log(show);
      const { owner, standaloneForms, folders, accessList } = response.data.data;

      set({
        workspaceOwner: owner,
        folders: folders?.filter((folder) => folder),
        forms: standaloneForms,
        workspaceAccessList: accessList,
        isLoadingWorkspace: false,
      });


    } catch (error) {
      if (error.response?.status === 404) {
        toast.error("Workspace not found. Please check the workspace ID.");
      } else if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch workspace data");
      }
      set({ isLoadingWorkspace: false });
    }
  },

  
}));

export default useWorkspaceStore;
