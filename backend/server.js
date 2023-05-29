const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoute = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();

// connection db
connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/user", userRoute);

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server is running at ${port}`));
