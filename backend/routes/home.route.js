import express from "express";
import { createFolder, createForm, getFolderById, getHome, getFormById, deleteFolderById, deleteFormById, updateUser} from "../controllers/home.controllers.js";
import { protectRoute } from "../middleware/protectRoute.js";






const router = express.Router();

router.get("/", protectRoute, getHome )
router.get("/folder/:id", protectRoute, getFolderById);
router.get("/:id", protectRoute, getFormById);
//router.get("/folder/:id/form/:id", protectRoute, getFolderById);

router.post("/createfolder", protectRoute,  createFolder);
router.post("/createform", protectRoute, createForm);




router.delete("/form/:id", protectRoute, deleteFormById);
router.delete("/folder/:id", protectRoute, deleteFolderById);

router.post("/settings", protectRoute, updateUser);


export default router;
