import express from "express";
import { getAllUsers, createUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/create", createUser);

export default router;
