import express from "express"
import cors from "cors"
import reviews from "./api/reviews.route.js"
import watchlist from "./api/watchlist.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/reviews", reviews)
app.use("/api/v1/watchlist", watchlist)
app.use("*", (req, res) => res.status(404).json({error: "not not found"}))

export default app

// const express = require('express');
// const app = express();

// const PORT = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
