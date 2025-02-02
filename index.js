import express from "express";
import router from "./routes/router.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "https://login-de-prueba.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE"], // Optional: you can specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Optional: you can specify allowed headers
}));
app.use(router);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
