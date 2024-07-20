import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import checkRoute from "./routes/check.route.js";


const app = express();

app.use(express.json());
app.use(cookieParser());

// client url like http://localhost:3000 
app.use(cors({ credentials: true, origin:process.env.CLIENT_URL }));
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/check", checkRoute);

app.listen(8800, () => {
  console.log("Listening on port 8800");
});
