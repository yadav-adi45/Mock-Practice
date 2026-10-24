import express from "express";
import cors from "cors";
import bookRoutes from "./routes/book.routes.js";
import issueRoutes from "./routes/issue.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(bookRoutes);
app.use(issueRoutes);

export default app;
