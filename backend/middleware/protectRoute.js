import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";
import { Workspace } from "../models/workspace.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    if (!ENV_VARS.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return res.status(500).json({ Success: false, Message: "Server configuration error" });
    }

    const token = req.cookies?.["jwt-formbot"]; // Fetching cookie
    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({ Success: false, Message: "Unauthorized - No Token Provided" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
    } catch (err) {
      console.error("JWT verification error:", err.message);
      return res.status(401).json({ Success: false, Message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.error("User not found with ID:", decoded.userId);
      return res.status(404).json({ Success: false, Message: "User not found" });
    }

    const workspace = await Workspace.findOne({ user: user._id });
    if (!workspace) {
      console.error("Workspace not found for user:", user._id);
      return res.status(404).json({ Success: false, Message: "Workspace not found" });
    }


    req.user = user; 
    req.workspaceId = workspace._id;// Attach the user to the request object
    next(); // Call the next middleware
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ Success: false, Message: "Internal Server Error at protect" });
  }
};
