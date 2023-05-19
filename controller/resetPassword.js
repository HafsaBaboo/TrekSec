const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const nodeMailer = require('nodemailer');
const Mailgen = require('mailgen');

const checkUserExistence = asyncHandler(async (req, res) => {
   let email = req.body.email;
   let findUser = await User.findOne({email: email});
   if(findUser){
    let secret = process.env.JWT_SECRET + findUser.password;
    let token = jwt.sign({ email: findUser.email, id: findUser._id }, secret, { expiresIn: "10m",});
    let link = `http://localhost:5000/api/user/newPassword/${findUser._id}/${token}`;
    
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
            outro: 'Need help, or have questions? Just ask il supporto tecnico.'
        }
    }
    
    let mail = MailGenerator.generate(response);

    let message = {
      from: 'treksec.baboo@gmail.com', 
      to: findUser.email,
      subject: 'Reset Password',
      html: mail,
    }
    
    transporter.sendMail(message).then(() =>{
      return res.status(201).json({
        msg: "you should receive an email"
      })
    }).catch(error =>{
      return res.status(201).json({error})
    }) 

    }else{
        throw new Error("Prego inserire la mail..");
    }
})

const changePassword = asyncHandler(async (req, res) => {
    
  });


module.exports = {checkUserExistence, changePassword};
