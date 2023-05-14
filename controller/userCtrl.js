
//now we have to require our user model

const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

function checkPasswordStrength(password) {
    var strength = 0;
    var tips="";

    // Check password length
  if (password.length < 8) {
    tips += "Make the password longer. ";
  } else {
    strength += 1;
  }

  // Check for mixed case
  if (password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    strength += 1;
  } else {
    tips += "Use both lowercase and uppercase letters. ";
  }

  // Check for numbers
  if (password.match(/\d/)) {
    strength += 1;
  } else {
    tips += "Include at least one number. ";
  }

  // Check for special characters
  if (password.match(/[^a-zA-Z\d]/)) {
    strength += 1;
  } else {
    tips += "Include at least one special character. ";
  }

  // Return results
  if (strength < 2) {
    throw new Error("Password easy to guess. Add at least another one of the following suggestions:" + tips);
    return false;
  } else {
    console.log("OK!");
    return true;
  }
}

function checkPasswords(password, checkPassword) {
  if (password !== checkPassword) {
    throw new Error("Passwords do not match.");
    return false;
  }
  console.log("hola");
  //console.log(password.value); 
  return true;
}

function checkTelefono(telefono){
  if((telefono).length != 10 ){
    throw new Error("Hai sbagliato ad inserire il numero di telefono");
    return false;
  }
  return true;
}


function checkNome(nomeCognome){
  if (nomeCognome.match(/\d/) || nomeCognome.match(/[^a-zA-Z\d]/)) { //vuol dire che contiene numeri o caratteri speciali
    throw new Error("Assicurati di aver usato solo lettere");
    return false;
  }
  return true;
}


const createUser = asyncHandler(async (req, res) => {
    const nomeCognome = req.body.nomeCognome;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const password = req.body.password;
    const checkPassword = req.body.checkPassword;

    console.log(nomeCognome, email, telefono, password, checkPassword);

    //var verifica = false;
    
    const findUser = await User.findOne({email: email});
    const findNumber = await User.findOne({telefono: telefono});


    

    //console.log(telefono.length);
    //console.log(telefono.charAt(0));
    console.log(telefono.length);


    checkNome(nomeCognome);
    checkPasswordStrength(password);
    checkPasswords(password, checkPassword);
    checkTelefono(telefono);

    

    if(!findUser && !findNumber) {
        //create a new user
        //const newUser = await User.create(req.body);
        const newUser = await User.create(req.body);
        //newUser = await newUser.save();
        res.redirect("../../index2.html");
        console.log("Utente creato con successo");

        
        

    }
 
    else {
        //user already exists
        //res.json({
        //    msg:"User already exists",
        //    success: false,
        //});
        throw new Error("User Already Exists");
    }

});

//login controller

const loginUserCtrl = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    //console.log(email);
    //const {email, password} = req.body;
    //console.log(email);
    //check if user exists
    const findUser = await User.findOne({email: email});
    if(!findUser){
      throw new Error("Email non valida. Crea un nuovo account.");
    }
    if(findUser && (await findUser.isPasswordMatched(password))){
        res.redirect("../../map.html");
    }else{
        throw new Error("Password errata. Si prega di riprovare.");
    }
})


const checkUsers = asyncHandler(async (req, res) => {
  
  try{
    const users = await User.find();
    res.json(users);
  }
  catch(error){
    throw new Error(error);
  }
});


const checkAUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;
  //const findUser = await User.findOne({email: email});

  try{
    const findUser = await User.findOne({email: email});
    res.json(findUser);
  }
  catch(error){
    throw new Error(error);
  }
});


//TODO
//next step: capire jwt

//fare una get per gli amministratori, cosicche possano prendersi il numero dell'utente in caso di pericolo
//capire come fare un altro modello per i loggati, che avranno la posizione (anche qui POST/GET)

//il PUT per modifica password


//per fare GET di ogni singolo utente, nel modello devo mettere un parametro "index"
//e una funzione che ogni volta che si aggiunge un utente incrementa una variabile di 1, cosi
//da rendere piu facile la ricerca .../utenti/index=1 (esempio)


module.exports = {createUser, loginUserCtrl, checkUsers, checkAUser};


