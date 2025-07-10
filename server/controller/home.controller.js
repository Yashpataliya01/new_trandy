import Home from "../models/home.model.js";

export const getHome = async (req, res) => {
  try {
    const home = await Home.find();
    res.status(200).json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHome = async (req, res) => {
  const { title, image } = req.body;
  try {
    const home = new Home({ title, image });
    await home.save();
    res.status(201).json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateHome = async (req, res) => {
  const { id } = req.params;
  const { title, image } = req.body;
  try {
    const home = await Home.findByIdAndUpdate(
      id,
      { title, image },
      { new: true }
    );
    res.status(200).json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteHome = async (req, res) => {
  const { id } = req.params;
  try {
    const home = await Home.findByIdAndDelete(id);
    res.status(200).json(home);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
