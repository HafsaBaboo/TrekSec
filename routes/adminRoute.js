const express = require('express');
const { loginAdminCtrl, checkAdmin, checkAAdmin } = require('../controller/adminCtrl');
const router = express.Router();

router.get("/",(req,res)=>{

    res.redirect("../../homeAdmin.html");


})    

router.get("/loginAdmin",(req,res)=>{

    res.redirect("../../loginAdmin.html");

})  





router.post('/loginAdminCtrl', loginAdminCtrl);

module.exports = router;
