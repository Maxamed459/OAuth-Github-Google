import express from "express"
import authRouter from "./routes/auth.router.js";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";
import cookieParser from "cookie-parser";


const app = express();
app.use(cookieParser())

app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello, the server is running successfully!"
    })
})

app.use("/api/auth", authRouter)

await connectDB();

app.listen(PORT, () => {
    console.log(`🚀 server is running on port http://localhost:${PORT}`);
})