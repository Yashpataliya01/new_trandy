import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Home = mongoose.model("Home", homeSchema);
export default Home;
