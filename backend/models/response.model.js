import mongoose from "mongoose";

const FormResponseSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  formId: {
    type: String,
    required: true,
  },
  formResponse: {
    type: 
      {
        questionId: String, 
        answer: mongoose.Schema.Types.Mixed 
      }
    
  }
});

export const FormResponse = mongoose.model("FormResponse", FormResponseSchema);