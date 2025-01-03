import mongoose from "mongoose";

const workspaceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  accessList: [
    {
      email: {
        type: String, 
        required: true,
      },
      permission: {
        type: String,
        enum: ['view', 'edit'], 
        required: true,
      }
    },
  ],
  folders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
    },
  ],
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
  ],
  formResponses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FormResponse", 
    }
  ],
});

export const Workspace = mongoose.model("Workspace", workspaceSchema);
