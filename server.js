const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// DEBUG
console.log("MONGO_URI:", process.env.MONGO_URI);

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
    res.send("Backend running 🚀");
});

// routes (ONLY ONE)
const projectRoutes = require("./routes/projectRoutes");
app.use("/api/projects", projectRoutes);

// MongoDB check
if (!process.env.MONGO_URI) {
    console.log("❌ MONGO_URI missing in environment variables");
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected ✅");
})
.catch((err) => {
    console.log("MongoDB Error ❌:", err.message);
});

// server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
