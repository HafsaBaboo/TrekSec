
//now we have to require our user model

const User = require("../models/userModel");

const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.find({email: email }).explain("executionStats");

    if(!findUser) {
        //create a new user
        //const newUser = await User.create(req.body);
        const newUser = await User.create(req.body);
        res.json(newUser);

    }
    else {
        //user already exists
        res.json({
            msg:"User already exists",
            success: false,
        });
    }

};


module.exports = {createUser};


