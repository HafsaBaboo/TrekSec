 const express = require('express');
 const { createUser, loginUserCtrl, checkUsers } = require('../controller/userCtrl');
 const router = express.Router();

 router.get("/directAccess", (req, res) => {
   //res.render("login");
   //const bottone = document.getElementById('post');
   //console.log(bottone);
   console.log("ciao");
   res.redirect("../../directAccess.html");

})
 
 router.get("/login", (req, res) => {
   //res.render("login");
   //const bottone = document.getElementById('post');
   //console.log(bottone);
   console.log("ciao");
   res.redirect("../../index2.html");

})

router.get("/registrazione", (req, res) => {
   //res.render("login");
   //const bottone = document.getElementById('post');
   //console.log(bottone);
   console.log("ciao");
   res.redirect("../../registrazione.html");

})



 router.post('/registrazione', createUser);

 router.post('/login', loginUserCtrl);
 router.get('/registrati', checkUsers);
// router.get('/registrazione/:id', )
 

 module.exports = router;








 