import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { fetchForm, saveForm, deleteElement } from "../controllers/form.controllers.js"


const router = express.Router();

router.get("/:formId", protectRoute, fetchForm)
router.post("/:formId/saveform", protectRoute, saveForm);
router.post("folder/:formId/saveform", protectRoute, saveForm);
router.post("/:formId/deleteElement", protectRoute, deleteElement);



export default router;
