import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import toast from 'react-hot-toast';
import useFormStore from './form.js';
import { v4 as uuidv4 } from 'uuid';

const useSessionStore = create(
  persist(
    (set, get) => ({
      forms: {}, // Store forms using formId as key
      isLoading: false,

      // Fetch a form and store it by formId
      fetchForm: async (formId) => {
        const { fetchFormFromBackend } = useFormStore.getState();
        set({ isLoading: true });
      
        try {
          const form = await fetchFormFromBackend(formId);
      
          const { name, folder, element} = form;
          console.log("1 consoled here", form);
          
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                formName: name,
                folder: folder,
                elements: element.map((el) => ({
                  ...el,
                  id: el.id, 
                  label: el.label,
                  bubblecontent: el.content || '',
                })),
              },
            },
            isLoading: false,
          }));
          toast.success("Form loaded successfully!");
        } catch (error) {
          toast.error("Failed to load form.");
          set({ isLoading: false });
        }
      },
      

     
      hasFormBeenFetched: (formId) => {
        return !!get().forms[formId];
      },

     
      saveForm: async (formId) => {
        const { forms } = get();
        const form = forms[formId];
        console.log(useFormStore.getState());

        // console.log(forms)
        if (!form) return;
       
        const { sendFormToBackend } = useFormStore.getState();
        console.log("2 consoled here", form);
        const payload = {
          name: form.formName,
          folder: forms.folder || null,
          elements: form.elements.map(({ type, label, bubblecontent }) => ({
            type,
            label:label,
            content: bubblecontent,
          })),
        };

       

        try {
          await sendFormToBackend(formId, payload);
          toast.success('Form saved successfully!');
          // console.log(payload);
          
          console.log("3 consoled here", form);
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                ...form,
                formName: payload.name,
                folderId: payload.folder,
                elements: payload.elements,
              },
            },
          }));

        
          sessionStorage.removeItem(`zustand-form-storage-${formId}`);

         
          await get().fetchForm(formId);
        } catch (error) {
          toast.error('Failed to save form.');
        }
      },

     
      addElement: (formId, type) => {
        console.log("Adding element with formId:", formId, "Type:", type);
        const newId = Date.now() + Math.random();
        console.log("Generated ID:", newId);
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: {
              ...state.forms[formId],
              elements: [
                ...state.forms[formId].elements,
                {
                  id: newId,  // Ensure ID is being set properly
                  type,
                  label: 'Label',
                  bubblecontent: '',
                },
              ],
            },
          },
        }));
      },
      
     
      updateElement: (formId, id, newLabel, newContent) => {
       
        set((state) => {
          console.log("5 consoled here",newLabel, newContent);
         return ({
          
          forms: {
            ...state.forms,
            [formId]: {
              ...state.forms[formId],
              elements: state.forms[formId].elements.map((el) =>
                el.id === id ? { ...el, label: newLabel, bubblecontent: newContent } : el
              ),
            },
          },
        })});
      },

     

      removeElement: async (formId, id) => {
        try {
          console.log("session", formId, id);
          // Send the delete request to the backend to remove the element from the database
          const { deleteElementFromBackend } = useFormStore.getState();
          await deleteElementFromBackend(formId, id);
      
          // Now remove the element from the local state
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                ...state.forms[formId],
                elements: state.forms[formId].elements.filter((el) => el.id !== id),
              },
            },
          }));
      
          toast.success("Element deleted successfully!");
        } catch (error) {
          toast.error("Failed to delete element.");
          console.error("Error deleting element:", error);
        }
      },
      
    




      
      
      resetFormState: (formId) => {
        console.log("7 consoled here");
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: { formName: '', elements: [] },
          },
        }));
      },
    }),
    {
      name: 'form-storage',
      getStorage: () => sessionStorage,
    }
  )
);

export default useSessionStore;
