import mongoose from "mongoose";
import "dotenv/config";
import Book from "./models/book.model.js";
import Issue from "./models/issue.model.js";

const sampleBooks = [
  { title: "Clean Code", author: "Robert Martin", totalCopies: 3, availableCopies: 3 },
  { title: "The Pragmatic Programmer", author: "Andrew Hunt", totalCopies: 2, availableCopies: 2 },
  { title: "JavaScript: The Good Parts", author: "Douglas Crockford", totalCopies: 1, availableCopies: 0 }, // 0 available for testing
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke", totalCopies: 4, availableCopies: 4 },
  { title: "You Don't Know JS", author: "Kyle Simpson", totalCopies: 2, availableCopies: 1 },
  { title: "Design Patterns", author: "Erich Gamma", totalCopies: 3, availableCopies: 3 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Book.deleteMany({});
    await Issue.deleteMany({});

    const createdBooks = await Book.insertMany(sampleBooks);

    // Seed 1 existing issue for testing
    await Issue.create({
      book: createdBooks[2]._id, // JavaScript: The Good Parts (0 available)
      memberName: "Amit",
      issuedAt: new Date(),
    });

    console.log("6 sample books and 1 issue record seeded successfully!");
    await mongoose.connection.close();
  } catch (error) {
    console.log("Error seeding books:", error);
    await mongoose.connection.close();
  }
};

seedDB();
