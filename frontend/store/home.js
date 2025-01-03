import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';

export const useHomeStore = create((set) => ({
  folders: [],
  forms: [],
  isCreatingFolder: false,
  isCreatingForm: false,
  isLoadingFolders: false,
  isLoadingForms: false,
  isUpdatingUser: false,

  fetchHome: async () => {
    set({ isLoadingFolders: true, isLoadingForms: true });
    try {
      const response = await axios.get("/api/home", {
        withCredentials: true,
      });

      const { standaloneForms, folders } = response.data.data;

      set({
        folders: folders?.filter((folder) => folder),
        forms: standaloneForms,
        isLoadingFolders: false,
        isLoadingForms: false,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Unauthorized: Please log in again.");
      } else if (error.response?.status === 403) {
        toast.error("Forbidden: You do not have access to this resource.");
      } else {
        toast.error(error.response?.data?.message || "Failed to fetch folders and forms");
      }
      set({ isLoadingFolders: false, isLoadingForms: false });
    }
  },

  createFolder: async (folderData) => {
    set({ isCreatingFolder: true });
    try {
      const response = await axios.post(
        "/api/home/createfolder",
        folderData,
        { withCredentials: true }
      );
      set((state) => ({
        folders: [...state.folders, response.data.folder],
        isCreatingFolder: false,
      }));
      toast.success("Folder created successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create folder");
      set({ isCreatingFolder: false });
    }
  },

  folderById: async (folderId) => {
    set({ isLoadingForms: true });
    try {
      const response = await axios.get(`/api/home/folder/${folderId}`, {
        withCredentials: true,
      });
      set({
        forms: response.data.forms,
        isLoadingForms: false,
      });
    } catch (error) {
      toast.error("Failed to load forms for the selected folder");
      set({ isLoadingForms: false });
    }
  },

  createForm: async (formData) => {
    set({ isCreatingForm: true });
    try {
      console.log("store")
      const response = await axios.post(
        "/api/home/createform",
        formData,
        { withCredentials: true }
      );

      const newForm = response.data.form;

      set((state) => ({
        forms: [...state.forms, newForm],
        isCreatingForm: false,
      }));

      
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create Type Bot");
      set({ isCreatingForm: false });
    }
  },

  deleteForm: async (formId) => {
    try {
      await axios.delete(`/api/home/form/${formId}`, {
        withCredentials: true,
      });
      set((state) => ({
        forms: state.forms.filter((form) => form._id !== formId),
      }));
      toast.success("Form deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete form");
    }
  },

  deleteFolder: async (folderId) => {
    try {
      await axios.delete(`/api/home/folder/${folderId}`, {
        withCredentials: true,
      });
      set((state) => ({
        folders: state.folders.filter((folder) => folder._id !== folderId),
      }));
      toast.success("Folder and its forms deleted successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete folder");
    }
  },

  updateUser: async (userId, userData) => {
    set({ isUpdatingUser: true });
    try {
      const response = await axios.put(
        "/api/home/settings", // Adjust endpoint if needed
        userData,
        { withCredentials: true }
      );
  
      set({ isUpdatingUser: false });
      toast.success("User details updated successfully.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update user details.");
      set({ isUpdatingUser: false });
    }
  },

  updateUser: async (userData) => {
    set({ isUpdatingUser: true });
    try {
      const response = await axios.post(
        `/api/home/settings`, // Adjust endpoint based on your API route
        userData,
        { withCredentials: true }
      );
  
      set({ isUpdatingUser: false });
  
      toast.success("User details updated successfully.");
      return response.data; // Return the updated user data if needed
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to update user details.";
      toast.error(errorMessage);
      set({ isUpdatingUser: false });
      throw new Error(errorMessage); // Rethrow the error if you want the caller to handle it
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

  
  
}))
