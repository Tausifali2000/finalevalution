import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { fetchAccessList, getWorkspace, shareWorkspace } from "../controllers/share.controller.js";


const router = express.Router(); //creating router instance

router.post("/share", protectRoute, shareWorkspace);


router.get("/accesslist", protectRoute, fetchAccessList);
router.get("/:workspaceId", protectRoute, getWorkspace);

export default router;
