const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");

// Declare the Schema of the Mongo model
var adminSchema = new mongoose.Schema({
    
    admin_email:{
        type:String,
        required:true,
        unique:true,
    },
    admin_password:{
        type:String,
        required:true,
    },
    
});

adminSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSaltSync(10);
    this.admin_password = await bcrypt.hash(this.admin_password, salt);
});



adminSchema.methods.isPasswordMatched = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.admin_password);
    //if password is crypted, it will return true, otherwise false.
}

//Export the model
module.exports = mongoose.model('Admin', adminSchema);
