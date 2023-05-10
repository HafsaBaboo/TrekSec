 const express = require('express');
 const { createUser, loginUserCtrl, checkUsers } = require('../controller/userCtrl');
 const router = express.Router();

 router.post('/registrazione', createUser);
 router.post('/login', loginUserCtrl);
 router.get('/registrazione', checkUsers);
 

 module.exports = router;






 