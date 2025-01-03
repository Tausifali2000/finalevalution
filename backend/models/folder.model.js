import mongoose from "mongoose";

const folderSchema = mongoose.Schema({
 
  workspace: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Workspace", 
    required: true },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  
  forms : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
  },
],

},
)



export const Folder = mongoose.model("Folder", folderSchema);