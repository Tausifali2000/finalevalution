import express from "express";


import { fetchForm } from "../controllers/form.controllers.js";

const router = express.Router();


router.get("/:formId", fetchForm);

export default router;