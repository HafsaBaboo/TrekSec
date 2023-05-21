const generateToken = require("../config/jwtToken");
const Admin = require("../models/adminModel");
const asyncHandler = require("express-async-handler");

const Type = {
  Moderator: "moderator",
  CallCenter: "callCenter",
  TecnicalSupport: "tecnicalSupport"
}

//To create an admin, it is necessary to use POSTMAN
const createAdmin = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const tipo = req.body.admin_type;

  if(tipo != Type.Moderator && tipo != Type.CallCenter && tipo != Type.TecnicalSupport){
    throw new Error("Error: Type of admin not found! Possible choices: [moderator],[callCenter],[tecnicalSupport]");
  }

  const findUser = await Admin.findOne({email: email});
  
  if(!findUser) {
      const newUser = await Admin.create(req.body);
      res.redirect("../../loginAdmin.html");
      console.log("Admin Created Succesfully!");
  }else {
      throw new Error("Error: Admin Already Exists!");
  }
})

//login controller
const loginAdminCtrl = asyncHandler(async (req, res) => {
    const admin_email = req.body.admin_email;
    const admin_password = req.body.admin_password;
    const Admin_type = {

        Moderator: "moderator",
        CallCenter: "callCenter",
        TecnicalSupport: "tecnicalSupport"
    }

    const admin_type_second = req.body.admin_type;
   
    //check if admin exists
    const findAdmin = await Admin.findOne({admin_email: admin_email});
    if(!findAdmin){
      throw new Error("Email non valida.");
    }html
    if(findAdmin && (await findAdmin.isPasswordMatched(admin_password))){
        
    }else{
        throw new Error("Password errata. Si prega di riprovare.");
    }

    switch(admin_type_second){

      case Admin_type.CallCenter : console.log("hi CallCenter") ; res.redirect("../../CallCenter.html"); break;
      case Admin_type.Moderator : console.log("hi Moderator"); res.redirect("../../Moderator.html") ; break;
      case Admin_type.TecnicalSupport : console.log("Hi TecnicalSupport"); res.redirect("../../tecnicalSupport.html"); break;
      
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

module.exports = {createAdmin, loginAdminCtrl, checkAdmin, checkAAdmin};


