import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utlis/generateToken.js";
import { Workspace } from "../models/workspace.model.js";

export async function signup(req, res) {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      email,
      password: hashedPassword,
      username,
    });

    // Save the new user
    await newUser.save();

    // Create a workspace for the new user
    const newWorkspace = new Workspace({
      user: newUser._id,
      accessList: [
        {
          email, 
          permission: "edit"
        }
      ], // Include the current user's email and permission
      folders: [],
      forms: [],
    });

    await newWorkspace.save();

    // Generate token and set cookie
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "", // Remove password from response
      },
      workspace: newWorkspace, // Return the workspace details if needed
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

export async function login (req, res) {
  try {
		const { email, password } = req.body; //fetching fields from frontend

		if (!email || !password) {  //checking fields
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		const user = await User.findOne({ email: email });  //finding user
		if (!user) {
			return res.status(404).json({ success: false, message: "Invalid credentials" });
		}

		const isPasswordCorrect = await bcryptjs.compare(password, user.password); //dycrpting password and checking

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false, message: "Invalid credentials" });
		}

		generateTokenAndSetCookie(user._id, res); //generate a token and set cookie

		res.status(200).json({ //sending login data in response
			success: true,
			user: {
				...user._doc,
				password: "", //removes password from response
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function logout (req, res) {
  try {
		res.clearCookie("jwt-formbot"); //clearing cookie on logout
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

export async function authCheck(req, res) {
	try {
		
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}