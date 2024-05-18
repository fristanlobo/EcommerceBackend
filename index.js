const express = require("express");
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({
    origin : process.env.FRONTEND_URL,//'http://localhost:3000',// (Whatever your frontend url is) 
    credentials: true, // <= Accept credentials (cookies) sent by the client
  })
)
app.use(express.json())
app.use("/api", router);
app.use(cookieParser());

const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running ");
    })
});
