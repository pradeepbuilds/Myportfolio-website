// Run with: node seed.js
// Populates the database with placeholder projects you can edit later.
import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";

dotenv.config();

const sampleProjects = [
  {
    title: "Project One",
    description:
      "Replace this with a real project description — what it does, the problem it solves, and your role in building it.",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/project-one",
    liveUrl: "",
    featured: true,
    order: 1,
  },
  {
    title: "Project Two",
    description:
      "Replace this with a real project description — what it does, the problem it solves, and your role in building it.",
    tags: ["Express", "PostgreSQL", "JWT Auth"],
    githubUrl: "https://github.com/yourusername/project-two",
    liveUrl: "",
    featured: true,
    order: 2,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Project.deleteMany({});
    await Project.insertMany(sampleProjects);
    console.log("Seeded sample projects. Edit them in your DB or via the API.");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
