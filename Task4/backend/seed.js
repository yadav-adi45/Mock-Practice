import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import User from "./models/user.model.js";
import Expense from "./models/expense.model.js";

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await User.deleteMany({});
    await Expense.deleteMany({});

    const passwordHash = await bcrypt.hash("secret123", 10);

    const user1 = await User.create({
      name: "Neha",
      email: "neha@gmail.com",
      password: passwordHash,
    });

    const user2 = await User.create({
      name: "Rahul",
      email: "rahul@gmail.com",
      password: passwordHash,
    });

    // Seed expenses for Neha
    await Expense.create([
      { user: user1._id, title: "Groceries", amount: 2400, category: "Food" },
      { user: user1._id, title: "Train Ticket", amount: 1300, category: "Travel" },
    ]);

    // Seed expenses for Rahul
    await Expense.create([
      { user: user2._id, title: "Electricity Bill", amount: 1500, category: "Bills" },
      { user: user2._id, title: "Books", amount: 500, category: "Other" },
    ]);

    console.log("Sample users and expenses seeded successfully!");
    console.log("User 1: neha@gmail.com / secret123");
    console.log("User 2: rahul@gmail.com / secret123");

    await mongoose.connection.close();
  } catch (error) {
    console.log("Error seeding:", error);
    await mongoose.connection.close();
  }
};

seedDB();
