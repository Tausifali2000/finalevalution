import { Form } from "../models/form.model.js";


export async function fetchForm(req, res) {
  try {
    const { formId } = req.params; 
    
const form = await Form.findById(formId)
    
if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    
    
     res.status(200).json({ success: true, form });
  } catch (error) {
    console.error("Error in fetchForm controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export const saveForm = async (req, res) => {
  try {
    // Extract data from the request body
    const { formId } = req.params; // The form ID to be updated
    const { folder, name, elements } = req.body; // Use 'elements' to match the input data
   

    // Validate user
    

    // Prepare the update object
    const updateData = {
      folder: folder || null, 
      name: name?.trim() || "Untitled Form", // Update name or default it
    };

    // Conditionally add 'elements' only if it's provided
    if (elements && Array.isArray(elements)) {
      updateData.element = elements;
    }

    // Find and update the form
    const updatedForm = await Form.findOneAndUpdate(
      { _id: formId }, // Ensure the user owns the form
      updateData,
      { new: true, runValidators: true } // Return the updated document and validate input
    );

    // If no form is found, return an error
    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found or you do not have permission to update it." });
    }

    // Respond with the updated form
    return res.status(200).json({
      message: "Form updated successfully!",
      form: updatedForm,
    });
  } catch (error) {
    console.error("Error updating form:", error);
    return res.status(500).json({
      message: "An error occurred while updating the form.",
      error: error.message,
    });
  }
};









export async function deleteElement(req, res) {
  console.log("reqTausif");
  try {
    const { formId } = req.params; // Get the form ID from the request params
    const { elementId } = req.body; // Expect the element ID to be deleted in the request body
    console.log(req.params, req.body);
    if (!elementId) {
      return res.status(400).json({ success: false, message: "Element ID is required" });
    }

    // Find the form by ID and ensure it belongs to the authenticated user
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ success: false, message: "Form not found" });
    }

    // Check if the element exists in the form
    const elementIndex = form.element.findIndex((el) => el._id.toString() === elementId);
    if (elementIndex === -1) {
      return res.status(404).json({ success: false, message: "Element not found in the form" });
    }

    // Remove the element from the form
    form.element.splice(elementIndex, 1);

    // Save the updated form
    await form.save();

    res.status(200).json({ success: true, message: "Element deleted successfully", form });
  } catch (error) {
    console.error("Error in deleteElement controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}




