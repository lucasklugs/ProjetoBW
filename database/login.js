// Importando biblioteca mongoose
const{ default: mongoose, Schema, model} = require("mongoose"); 

// Definindo um novo esquema (Schema)
const login = new Schema({
    username: {type: String},
    email: {type: String},
    password: {type: String}
    
})

// criando modelo login_model de acordo com o schema acima e exportando para ser utilizado em arquivos (require)
const login_model = new model("logins", login) 
module.exports = login_model