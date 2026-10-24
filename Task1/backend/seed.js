import mongoose from "mongoose";
import "dotenv/config";
import Task from "./models/task.model.js";

const seedTasks = [
  { title: "Finish React assignment", completed: false },
  { title: "Read Express documentation", completed: true },
  { title: "Complete MongoDB practice test", completed: false },
  { title: "Review Node.js REST API principles", completed: true },
  { title: "Practice JavaScript array methods", completed: false },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Task.deleteMany({});
    await Task.insertMany(seedTasks);
    console.log("5 sample tasks inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.log("Error seeding data:", error);
    mongoose.connection.close();
  }
};

seedDB();
