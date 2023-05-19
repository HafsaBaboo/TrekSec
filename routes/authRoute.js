const express = require('express');
const { createUser, loginUserCtrl, checkUsers } = require('../controller/userCtrl');
const {checkUserExistence, changePassword} = require('../controller/resetPassword');
const router = express.Router();

router.get("/directAccess", (req, res) => {
  res.redirect("../../directAccess.html");

})

router.get("/login", (req, res) => {
  res.redirect("../../login.html");

})

router.get("/registrazione", (req, res) => {
  res.redirect("../../registrazione.html");

})

router.get("/newPassword/:id/:token", async (req, res) => {
 res.redirect("../../newPassword.html");
})


router.get("/resetPassword", (req, res) => {
  res.redirect("../../resetPassword.html");
})

router.post('/registrazione', createUser);

router.post('/login', loginUserCtrl);
router.get('/registrati', checkUsers);
router.post('/resetPassword', checkUserExistence);
router.put('/newPassword', changePassword);

module.exports = router;