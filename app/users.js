const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
const Mailgen = require('mailgen');

// Reset della password di un utente che ha già effettuato la registrazione
router.post('/reset-password',  async (req, res) => {
  // Per effettuare il reset, l'utente deve inserire come campo l'email
  let email = req.body.email;

  // Si cerca l'utente nel DB
  const findUser = await User.findOne({email: email});

  if(!findUser) {
    return res.status(404).json({ error: 'Email not found' });
  }
  //Si genera un token che identifica univocamente l'utente
  let token = jwt.sign({ email: findUser.email }, process.env.SUPER_SECRET, { expiresIn: "10m",});

  const user = await User.findOneAndUpdate(
    { id: findUser.id },
    { token: token},
    { new: true }
  );

  const resetLink = `http://localhost:8080/newPassword.html?token=${token}`;
  sendMailF(findUser.email, resetLink);

  return res.json({token});

});

// Si accede alla pagina di reset password
router.put('/reset-password', async (req, res) => {
  const token = req.body.token;
  const password = req.body.newPassword;
  const checkPassword = req.body.newcheckPassword;
  
  try{

    if(checkPasswordStrength(req.body.newPassword) && risp.length > 0) {
      return res.status(400).json({error: risp});
    }

    if(checkPasswords(req.body.newPassword, req.body.newcheckPassword)) {
      return res.status(400).json({error: 'Passwords do not match.'});
    }
    
    const user = await User.findOneAndUpdate(
      { token: token },
      { password: password, checkPassword: checkPassword, token: undefined },
      { new: true }
    );

    return res.status(201).json("User Updated!");

  } catch(error) {
    return res.status(500).json({ message: 'Si è verificato un errore durante il reset della password. Riprova più tardi.' });
  }

});

  function sendMailF(email, link){
    let config = {
      service : 'gmail',
      auth: {
        user: "treksec.baboo@gmail.com",
        pass: "mtanhszmrkehqcnn"
      },
      tls: {
        rejectUnauthorized: false
      }
    }
    let transporter = nodeMailer.createTransport(config);
  
    let MailGenerator = new Mailgen({
        theme : "default",
        product : {
          name: "Mailgen",
          link : 'https://mailgen.js/'
        }
    })
    
    let response = {
        body: {
            name: 'This is TrekSec app',
            intro: 'You clicked on ResetPassword',
            action: {
                instructions: 'To reset your password, please click here:',
                button: {
                    text: 'Reset your password',
                    link: link
                }
            },
            outro: 'Need help, or have questions? Just ask the "supporto tecnico".'
        }
    }
    
    let mail = MailGenerator.generate(response);
  
    let message = {
      from: 'treksec.baboo@gmail.com', 
      to: email,
      subject: 'Reset Password',
      html: mail,
    }
    // send email
    transporter.sendMail(message)
  }

module.exports = router;
