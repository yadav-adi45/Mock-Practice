import express from "express";
import cors from "cors";
import itemRoutes from "./routes/item.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Mount Routes
app.use(itemRoutes);

export default app;
