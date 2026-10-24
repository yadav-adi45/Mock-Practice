import mongoose from "mongoose";
import "dotenv/config";
import Product from "./models/product.model.js";

const sampleProducts = [
  // Electronics
  { sku: "SKU-1001", name: "Wireless Mouse", category: "Electronics", price: 799, stock: 25 },
  { sku: "SKU-1002", name: "Mechanical Keyboard", category: "Electronics", price: 2499, stock: 3 },
  { sku: "SKU-1003", name: "USB-C Hub", category: "Electronics", price: 1299, stock: 15 },
  { sku: "SKU-1004", name: "Bluetooth Speaker", category: "Electronics", price: 1899, stock: 8 },
  { sku: "SKU-1005", name: "Gaming Headphones", category: "Electronics", price: 3499, stock: 2 },

  // Grocery
  { sku: "SKU-1006", name: "Organic Green Tea", category: "Grocery", price: 299, stock: 50 },
  { sku: "SKU-1007", name: "Dark Chocolate", category: "Grocery", price: 149, stock: 40 },
  { sku: "SKU-1008", name: "Almond Butter", category: "Grocery", price: 499, stock: 4 },
  { sku: "SKU-1009", name: "Rolled Oats", category: "Grocery", price: 199, stock: 20 },
  { sku: "SKU-1010", name: "Olive Oil", category: "Grocery", price: 899, stock: 12 },

  // Clothing
  { sku: "SKU-1011", name: "Cotton T-Shirt", category: "Clothing", price: 599, stock: 35 },
  { sku: "SKU-1012", name: "Denim Jeans", category: "Clothing", price: 1999, stock: 18 },
  { sku: "SKU-1013", name: "Winter Jacket", category: "Clothing", price: 3999, stock: 1 },
  { sku: "SKU-1014", name: "Woolen Scarf", category: "Clothing", price: 399, stock: 14 },
  { sku: "SKU-1015", name: "Running Shoes", category: "Clothing", price: 2799, stock: 6 },

  // Books
  { sku: "SKU-1016", name: "Clean Code", category: "Books", price: 999, stock: 10 },
  { sku: "SKU-1017", name: "The Pragmatic Programmer", category: "Books", price: 1199, stock: 7 },
  { sku: "SKU-1018", name: "JavaScript: The Good Parts", category: "Books", price: 650, stock: 3 },
  { sku: "SKU-1019", name: "Design Patterns", category: "Books", price: 1450, stock: 5 },
  { sku: "SKU-1020", name: "You Don't Know JS", category: "Books", price: 750, stock: 15 },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log("20 sample products seeded successfully across all 4 categories!");
    await mongoose.connection.close();
  } catch (error) {
    console.log("Error seeding products:", error);
    await mongoose.connection.close();
  }
};

seedDB();
