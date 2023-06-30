const{ default: mongoose, Schema, model} = require("mongoose");

const register = new Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
})

const register_model = new model("register", register)
module.exports = register_model