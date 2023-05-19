const generateToken = require("../config/jwtToken");
const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");



//login controller

const loginAdminCtrl = asyncHandler(async (req, res) => {
    const admin_email = req.body.admin_email;
    const admin_password = req.body.admin_password;
   
    //check if admin exists
    const findAdmin = await Admin.findOne({admin_email: admin_email});
    if(!findAdmin){
      throw new Error("Email non valida.");
    }
    if(findAdmin && (await findAdmin.isPasswordMatched(admin_password))){
        res.redirect("../../map.html");
    }else{
        throw new Error("Password errata. Si prega di riprovare.");
    }
})


const checkAdmin = asyncHandler(async (req, res) => {
  
  try{
    const admin = await Admin.find();
    res.json(admin);
  }
  catch(error){
    throw new Error(error);
  }
});


const checkAAdmin = asyncHandler(async (req, res) => {
  const {admin_email, admin_password} = req.body;
  //const findUser = await User.findOne({email: email});

  try{
    const findAdmin = await Admin.findOne({admin_email: admin_email});
    res.json(findAdmin);
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

document.getElementById("buttonAdmin").addEventListener("click", function() {
    window.location.href = "homeAdmin.html";
  });

module.exports = {loginAdminCtrl, checkAdmin, checkAAdmin};


