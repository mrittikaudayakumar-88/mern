import dotenv from"dotenv";
dotenv.config();

import express from "express"
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from 'cors';
const app = express();
app.use(cors({
    orgin:"http://localhost:5173/",
    credentials: true,
}))
app.use(express.json());
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDB().then( ()=> {

app.listen(5001, () => {
    console.log("Server started  on PORT: 5001");
});
});