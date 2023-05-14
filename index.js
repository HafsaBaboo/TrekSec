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



const authRouter = require("./routes/authRoute");
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

dcConnect();

//bodyParser
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
   //res.send("Hello from server side");
   //res.redirect("index2.html");
   console.log("hi");
   res.redirect("home.html");
})
/*
app.set("view engine", "hbs");
app.set("views", templatePath);

app.get("/login", (req, res) => {
   res.render("login");
   console.log("ciao");
})
*/



app.use("/api/user", authRouter);


app.use(notFound);
app.use(errorHandler);

//npm i express-async handler
// i import it into "/controller/userCtrl"

app.listen(PORT, () => {
   console.log(`Server is running at PORT ${PORT}`);
})