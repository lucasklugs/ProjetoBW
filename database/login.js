const{ default: mongoose, Schema, model} = require("mongoose");

const login = new Schema({
    email: {type: String},
    password: {type: String}
    
})

const login_model = new model("login", login)
module.exports = login_model