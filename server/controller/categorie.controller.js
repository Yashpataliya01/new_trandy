import express from "express";
import cookieParser from "cookie-parser";
import Categorie from "../models/categorie.model.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

export const createCategorie = async (req, res) => {
  const { name, description } = req.body;
  try {
    // Check if a categorie with the same name already exists
    const existingCategorie = await Categorie.findOne({ name });
    if (existingCategorie) {
      return res.status(400).json({ message: "Categorie already exists" });
    }
    const newCategorie = new Categorie({ name, description });
    await newCategorie.save();
    res.status(201).json({ message: "Categorie created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateCategories = async (req, res) => {
  const { name, description } = req.body;
  try {
    const categorie = await Categorie.findById(req.params.id);
    categorie.name = name;
    categorie.description = description;
    await categorie.save();
    res.status(200).json({ message: "Categorie updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const DeleteCategories = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    await categorie.deleteOne();
    res.status(200).json({ message: "Categorie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
