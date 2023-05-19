
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
  if (strength < 4) {
    throw new Error("Password easy to guess. Add at least another one of the following suggestions:" + tips);
  } else {
    return true;
  }
}

function checkPasswords(password, checkPassword) {
  if (password !== checkPassword) {
    throw new Error("Passwords do not match.");
  }
  return true;
}

function checkIfEmailInString(text) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(text);
}

function checkTelefono(telefono){
  if((telefono).length != 10 ){
    throw new Error("Hai sbagliato ad inserire il numero di telefono");
  }
  return true;
}


function checkNome(nomeCognome){
  if (nomeCognome.match(/\d/) || nomeCognome.match(/[^a-zA-Z\d]/)) { 
    throw new Error("Assicurati di aver usato solo lettere");
  }
  return true;
}

const createUser = asyncHandler(async (req, res) => {
    const nomeCognome = req.body.nomeCognome;
    const email = req.body.email;
    const telefono = req.body.telefono;
    const password = req.body.password;
    const checkPassword = req.body.checkPassword;
    
    const findUser = await User.findOne({email: email});
    const findNumber = await User.findOne({telefono: telefono});


    checkNome(nomeCognome);
    checkPasswordStrength(password);
    checkPasswords(password, checkPassword);
    checkTelefono(telefono);
    checkIfEmailInString(email);

    

    if(!findUser && !findNumber) {
        const newUser = await User.create(req.body);
        res.redirect("../../index2.html");
        console.log("Utente creato con successo");
    }else {
        throw new Error("User Already Exists");
    }

});

const loginUserCtrl = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
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
  try{
    const findUser = await User.findOne({email: email});
    res.json(findUser);
  }
  catch(error){
    throw new Error(error);
  }
});

module.exports = {createUser, loginUserCtrl, checkUsers, checkAUser};