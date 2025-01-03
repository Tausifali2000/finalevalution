import { Folder } from "../models/folder.model.js";
import { Form } from "../models/form.model.js";
import { User } from "../models/user.model.js";
import { Workspace } from "../models/workspace.model.js";

export async function shareWorkspace(req, res) {
  try {
    const { email, permission } = req.body;

    if (!email || !permission) {
      return res.status(400).json({ success: false, message: "Email and permission are required" });
    }

    if (!['view', 'edit'].includes(permission)) {
      return res.status(400).json({ success: false, message: "Invalid permission type" });
    }

    const workspaceId = req.workspaceId;

    // Find the workspace by ID
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    // Check if the email already exists in the access list
    const existingAccess = workspace.accessList.find(user => user.email === email);
    if (existingAccess) {
      return res
        .status(400)
        .json({ success: false, message: "User already has access to this workspace" });
    }

    // Add the email and permission to the access list
    workspace.accessList.push({ email, permission });
    await workspace.save();

    res.status(200).json({ success: true, message: "Workspace shared successfully" });
  } catch (error) {
    console.error("Error in shareWorkspace controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export const fetchAccessList = async (req, res) => {
  try {
    // Retrieve the current user's ID and email from the request
    const userId = req.user._id;

    // Fetch the user's email from the User model
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const userEmail = user.email;

    // Find all workspaces where the user's email is in the accessList but exclude the user's own workspaces
    const accessibleWorkspaces = await Workspace.find({
      "accessList.email": userEmail,
      user: { $ne: userId }, // Exclude workspaces owned by the current user
    }).populate("user", "email username");

    if (accessibleWorkspaces.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No accessible workspaces found.",
        workspaces: [],
      });
    }

    // Return the accessible workspaces
    res.status(200).json({
      success: true,
      message: "Accessible workspaces retrieved successfully.",
      workspaces: accessibleWorkspaces.map((workspace) => ({
        id: workspace._id,
        ownerUsername: workspace.user.username,
        ownerEmail: workspace.user.email,
        permission: workspace.accessList.find(
          (access) => access.email === userEmail
        ).permission,
      })),
    });
  } catch (error) {
    console.error("Error fetching accessible workspaces:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};



export const fetchWorkspaceById = async (req, res) => {
  try {
    const { workspaceId } = req.params;

    // Validate the workspaceId
    if (!workspaceId) {
      return res.status(400).json({
        success: false,
        message: "Workspace ID is required.",
      });
    }

    // Fetch the workspace by ID and populate related fields
    const workspace = await Workspace.findById(workspaceId)
      .populate("user", "username email") // Fetch owner details
      .populate("folders") // Fetch folder details
      .populate("forms"); // Fetch form details

    if (!workspace) {
      return res.status(404).json({
        success: false,
        message: "Workspace not found.",
      });
    }

    // Respond with the workspace data
    res.status(200).json({
      success: true,
      message: "Workspace fetched successfully.",
      workspace,
    });
  } catch (error) {
    console.error("Error fetching workspace:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};


export async function getWorkspace(req, res) {
  try {
    const { workspaceId } = req.params;

    // Validate the workspace ID
    if (!workspaceId) {
      return res.status(400).json({ success: false, message: "Workspace ID is required" });
    }

    // Fetch the workspace by ID and populate folders and forms
    const workspace = await Workspace.findById(workspaceId)
      .populate({
        path: "folders",
        populate: {
          path: "forms",
          model: "Form",
        },
      })
      .populate("forms"); // Populate standalone forms

    // Check if the workspace exists
    if (!workspace) {
      return res.status(404).json({ success: false, message: "Workspace not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        owner: {
          id: workspace.user,
          email: workspace.user?.email,
          username: workspace.user?.username,
        },
        standaloneForms: workspace.forms, // Forms not associated with any folder
        folders: workspace.folders, // Folders with their forms populated
        accessList: workspace.accessList, // Access list for the workspace
      },
    });
  } catch (error) {
    console.error("Error in getWorkspace controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
