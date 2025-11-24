import mongoose, { Schema } from "mongoose";

const ProjectSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  tags: { type: [String], required: false },
  liveLink: { type: String, required: false },
  githubLink: { type: String, required: false },
  category: { type: String, required: true, default: "web" },
  status: { type: String, required: true, default: "planning" },
  progress: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
