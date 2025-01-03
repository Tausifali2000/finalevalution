import { create } from 'zustand';
import axios from 'axios';

export const useFormStore = create(() => ({
  fetchFormFromBackend: async (formId) => {
    try {
      const response = await axios.get(`/api/form/${formId}`, {
        withCredentials: true,
      });
      return response.data.form; 
    } catch (error) {
      console.error('Failed to fetch form:', error);
      throw error;
    }
  },

  sendFormToBackend: async (formId, payload) => {
    try {
       console.log(payload);
      const response = await axios.post(
        `/api/form/${formId}/saveform`,
        payload,
        { withCredentials: true }
      );
      return {"final REsponse" : response.data }; 
    } catch (error) {
      console.error('Failed to save form:', error);
      throw error;
    }
  },

  deleteElementFromBackend: async (formId, elementId) => {
    try {
      console.log("formstore");
      console.log(elementId);
      const response = await axios.post(`/api/form/${formId}/deleteElement`, {
        elementId  // Send elementId in the body for DELETE requests
      });

      if (response.status !== 200) {
        throw new Error('Failed to delete element from backend');
      }

      return response.data; // Optionally return the response if needed
    } catch (error) {
      console.error("Error deleting element:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },
}));

export default useFormStore;
