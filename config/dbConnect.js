
const mongoose = require('mongoose');

const dcConnect = () => {
    try{
        //const conn = mongoose.connect('mongodb://localhost:27017/treksec');
        //const conn = mongoose.connect("mongodb+srv://andreivoinea:nNtbdh6ZTWB9Xclr@treksec1.lfljmoa.mongodb.net/?authSource=TrekSec1&authMechanism=SCRAM-SHA-1", {
        //    useNewUrlParser: true, useUnifiedTopology: true
        //})
        const conn = mongoose.connect("mongodb+srv://andreivoinea:nNtbdh6ZTWB9Xclr@treksec1.lfljmoa.mongodb.net/?authSource=TrekSec1&authMechanism=SCRAM-SHA-1");
        console.log("DB connected succesfully!");
    }
    catch(error){
        throw new Error(error);
        console.log("Database error");
    }
};

module.exports = dcConnect;