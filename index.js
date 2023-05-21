 /*
 1) npm init --> crea package.json
 2) npm i express mongoose bcrypt body-parser dotenv

 3) .env file

 4) in package.json, salvo "start" e "server"
 5) su terminale, "npm i nodemon --save-dev"

6) seguo tutta la procedura di installazione mongodb
7) creo il model

 */


/*FRONTEND is what you interract with, whereas 
  BACKEND is typically a server */



const express = require('express');
const dcConnect = require('./config/dbConnect');
const app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 8080;

const router = require('./routes/authRoute');
const router_admin = require('./routes/adminRoute');



const authRouter = require("./routes/authRoute");
const adminRouter = require("./routes/adminRoute");

const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dcConnect();

//bodyParser
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
   res.redirect("home.html");
})

app.use("/api/user", authRouter);
app.use("/api/admin", adminRouter);



app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
   console.log(`Server is running at PORT ${PORT}`);
})
