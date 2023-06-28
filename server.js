const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2');
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const path = require('path')
app.use('/img', express.static('img'))
app.use('/js', express.static('js'))
app.use('/css', express.static('css'))
app.use('/html', express.static('html'))


const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'brownow',
  port: '3307'
});

connection.connect(function (err) {
  if (!err){
    console.log("connected with database.");
  } else{
    console.log("Error: connection", err);
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/html/login.html')
})
app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/html/cadastro.html')
})
app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  connection.query("SELECT * FROM usuarios where email_usuario = '" + email +"'", function (err, rows) {
    if (!err){
      console.log("Resultado:",rows );
      
      if (password === "Senha do banco" ){
        console.log('Senha OK');
      }else{
        console.log('Senha errada');
      }
      if(login == "admin" && password == "admin"){
        alert("Sucesso");
        location.href = "../index.html";
      }else{
        alert('Email ou senha incorreto')
      }

    }});
})
app.listen(3000, () => {
  console.log('Server online')
})