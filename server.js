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
  res.sendFile(__dirname + '/')
})

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/html/login.html')
})
app.get('/cadastro', (req, res) => {
  res.sendFile(__dirname + '/html/cadastro.html')
})
app.post('/cadastro', (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  
app.post('/login', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;



  connection.query("INSERT INTO user(user_name, user_email, user_password) VALUES  ('" + name + "', '" + email + "','" + password + "')", function (err, rows, fields) {
      console.log("Results:", rows);
      if (!err) {
          console.log("Cadastro feito com sucesso!!");
          res.sendFile(__dirname + '/html/cadastro.html')
      } else {
          console.log("Erro: Consulta não realizada", err);
          res.send('Login failed');
      }
  });
});


  connection.query("SELECT * FROM user where email_user = '" + email +"'", function (err, rows) {
    if (!err){
      if (email === rows[0].email_user && password === rows[0].password_user ){
        console.log('Senha OK');
        res.redirect('/');
      }else{
        console.log('Senha errada');
        alert('Email ou senha incorreto')
      }

    }});

})
app.listen(3000, () => {
  console.log('Server online')
})