const User = require("../models/userModel");
const { checkPasswordStrength, checkPasswords } = require('./userCtrl');
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
const Mailgen = require('mailgen');

// check user existance
const checkUserExistence = asyncHandler(async (req, res) => {
   let email = req.body.email;
   let findUser = await User.findOne({email: email});
   
   // check if user in a registered user and if true, create a token and set the url
   if(findUser){
    let secret = process.env.JWT_SECRET + findUser.password;
    let token = jwt.sign({ email: findUser.email, id: findUser._id }, secret, { expiresIn: "10m",});
    let link = `http://localhost:5000/api/user/newPassword/${findUser._id}/${token}`;
    
    // create the mail to send
    let config = {
      service : 'gmail',
      auth: {
        user: "treksec.baboo@gmail.com",
        pass: "mtanhszmrkehqcnn"
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
      to: findUser.email,
      subject: 'Reset Password',
      html: mail,
    }
    // send email
    transporter.sendMail(message).then(() =>{
      return res.status(200).json({
        msg: "you should receive an email"
      })
    }).catch(error =>{
      return res.status(400).json({error})
    }) 
    }else{
        throw new Error("Prego inserire la mail..");
    }
})

//get the page of reset password 
const getPage = asyncHandler(async (req, res) => {
  //check that the user accessing this page is registered and that the token didn't expire
  const { id, token } = req.params;
  console.log(req.params);
  const mail = req.body.mail;
  console.log(mail);
  const findUser = await User.findOne({ _id: id });
  if (!findUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  //if the user is found redirect to the page of resetting password
  const secret = process.env.JWT_SECRET + findUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.redirect("/newPassword.html").json({
      self: '../../newPassword/' + findUser.id + token,
  });
  } catch (error) {
    console.log(error);
    res.send("Your time to change ehte password expired, please reask to change it");
  }
});

//funciotn for the put of the page of reset password 
const changePassword = asyncHandler(async (req, res) => {
  //check that the user accessing this page is registered and that the token didn't expire
  const { id, token } = req.params;
  const password = req.body.password;
  const checkPassword = req.body.checkPassword;

  const findUser = await User.findOne({ _id: id });
  if (!findUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  //if the user is found check that the password and the checkpassword are the same and that it is a "safe" password
  const secret = process.env.JWT_SECRET + findUser.password;
  try {
    const verify = jwt.verify(token, secret);

    checkPasswordStrength(password);
    checkPasswords(password, checkPassword);
    //encript the new password and update the old one
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne({
                          _id: id,
                        }, {
                          $set: {
                            password: encryptedPassword,
                          },
                        });

  //res.render("login", { email: verify.email, status: "verified" });
    res.redirect("/login.html").json({
      self: '../../login/',
      email: verify.email
  });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
  });


module.exports = {checkUserExistence, changePassword, getPage};
