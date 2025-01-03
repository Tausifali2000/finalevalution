import express from "express";
import { formResponse } from "../controllers/response.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";


const router = express.Router();

router.post("/", protectRoute, formResponse);

export default router;
