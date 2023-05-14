const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    nomeCognome:{
        type:String,
        required:true,
    },
    telefono:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    checkPassword:{
        type:String,
        required:true,
    },
    //condizioni:{
    //    type:Boolean
   // }
    //credenziali:{
    //    type:Boolean,
    //    required:true
    //}
});

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
    //this.checkPassword = await bcrypt.hash(this.checkPassword, salt);
});



userSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
    //if password is crypted, it will return true, otherwise false.
}

//Export the model
module.exports = mongoose.model('User', userSchema);