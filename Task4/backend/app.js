import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import expenseRoutes from "./routes/expense.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(authRoutes);
app.use(expenseRoutes);

export default app;
