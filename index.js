 /*
 1) npm init --> crea package.json
 2) npm i express mongoose bcrypt body-parser dotenv

 3) .env file

 4) in package.json, salvo "start" e "server"
 5) su terminale, "npm i nodemon --save-dev"

6) seguo tutta la procedura di installazione mongodb
7) creo il model

 */

const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8080;

const authRouter = require("./routes/authRoute");
const bodyParser = require('body-parser');

dbConnect();

//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
/*
app.use('/', (req, res) => {
   res.send("Hello from server side");
})
*/

app.use("/api/user", authRouter);

app.listen(PORT, () => {
   console.log(`Server is running at PORT ${PORT}`);
})