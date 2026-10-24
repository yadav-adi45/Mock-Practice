import mongoose from "mongoose";
import "dotenv/config";
import Contact from "./models/contact.model.js";

const sampleContacts = [
  { name: "Amit Verma", phone: "9876543210", email: "amit@gmail.com" },
  { name: "Ananya Roy", phone: "9844556677", email: "ananya@outlook.com" },
  { name: "Deepa Singh", phone: "9866778899", email: "deepa@gmail.com" },
  { name: "Priya Sharma", phone: "9811223344", email: "priya@gmail.com" },
  { name: "Rahul Mehta", phone: "9822334455", email: "rahul@yahoo.com" },
  { name: "Rohit Kumar", phone: "9855667788", email: "rohit@gmail.com" },
  { name: "Sneha Patel", phone: "9833445566", email: "sneha@gmail.com" },
  { name: "Vikram Joshi", phone: "9877889900", email: "vikram@gmail.com" },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Contact.deleteMany({});
    await Contact.insertMany(sampleContacts);
    console.log("8 sample contacts seeded successfully!");
    await mongoose.connection.close();
  } catch (error) {
    console.log("Error seeding contacts:", error);
    await mongoose.connection.close();
  }
};

seedDB();
