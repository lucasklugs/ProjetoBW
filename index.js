// Importa as dependências necessárias
const express = require("express");
const body_parser = require("body-parser")
const app = express();
const port = 3000
const mongoose = require('mongoose')
// Configura a conexão com o banco
mongoose.connect("mongodb+srv://lucasklugs:FiB2JFnxYK6cUWoh@brownow.dgydvhu.mongodb.net/");
const db = mongoose.connection
db.once("open", ()=>{
    console.log("Database Connected");
})
// Importa as dependências necessárias
const login_model = require("./database/login")

const exp = require('constants')
const path =  require('path');
const session = require("express-session");

//A configuração do Express
app.use(express.static(path.join(__dirname, "/public")))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended: true}))
app.set('trust proxy', 1)
app.use(session({
    secret: 'lucasmongo69',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Definição para verificar o tipo de usuário sendo primeiramente um "guest" e após o login um "user"
 app.all('*', (req, res, next) => {
    console.log(req.session.type)
     if(req.session.type === undefined ){
        req.session.type = "guest" 
     } else {
        console.log("user is logged")
     }
     next()
 })

// Autenticação de login
 app.post('/login', async(req, res) => {
    console.log(req.body)
    const result = await login_model.findOne({
     email:req.body.email
    })
    console.log(result.password, req.body.password)
     if (req.body.password === result.password){
        req.session.type = "user" 
         console.log("logged in")
         res.redirect('/');
     }  
     else {
        console.log("Not connected")
        res.send("Not connected")
        
     }
 }) 

// Cadastro de novo usuário
 app.post('/cadastro', async(req, res) => {
    console.log(req.body)
    const result = await login_model.create(
        req.body
    )
    res.redirect('/login.html');
 })

// Iniciar servidor
 app.listen(3000, () => {
   console.log('Server on the port 3000')
 })



// Abaixo são apenas testes anteriores:

//  run().catch(console.dir);
//  const express = require('express')
//  const bodyParser = require('body-parser')
//  const mysql = require('mysql2');
//  const app = express()
 
//  app.use(bodyParser.json())
//  app.use(bodyParser.urlencoded({ extended: false }))
 
//  const path = require('path')
//  app.use('/img', express.static('img'))
//  app.use('/js', express.static('js'))
//  app.use('/css', express.static('css'))
//  app.use('/html', express.static('html'))
 
 
//  const connection = mysql.createConnection({
//    host: '127.0.0.1',
//    user: 'root',
//    password: '',
//    database: 'brownow',
//    port: '3307'
//  });
 
//  connection.connect(function (err) {
//    if (!err){
//      console.log("connected with database.");
//    } else{
//      console.log("Error: connection", err);
//    }
//  });
 
//  const { MongoClient, ServerApiVersion } = require('mongodb');
//  const uri = "mongodb+srv://lucasklugs:<password>@brownow.dgydvhu.mongodb.net/?retryWrites=true&w=majority";
//  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
//  const client = new MongoClient(uri, {
//    serverApi: {
//      version: ServerApiVersion.v1,
//      strict: true,
//      deprecationErrors: true,
//    }
//  });
//  async function run() {
//    try {
//      // Connect the client to the server	(optional starting in v4.7)
//      await client.connect();
//      // Send a ping to confirm a successful connection
//      await client.db("admin").command({ ping: 1 });
//      console.log("Pinged your deployment. You successfully connected to MongoDB!");
//    } finally {
//      // Ensures that the client will close when you finish/error
//      await client.close();
//    }
//  }
 
 
//  app.get('/', (req, res) => {
//    res.sendFile(__dirname + '/')
//  })
 
 
//  app.post('/login', (req, res) => {
//    let username = req.body.username;
//    let password = req.body.password;
   
//    connection.query("SELECT * FROM user where email = '" + username + "'" , function (err, rows, fields) {
//      console.log("Results:", rows);
     
//      if (!err) {
 
//        if (rows.length > 0) {
//          if (email === rows[0].email_user && password === rows[0].password_user ){
//            console.log('Password OK');
//            
//          }else{
//            console.log('Password Incorrect');
//            alert('Email or password incorrect')
//          }
         
//        } else {
//          res.send('Login Failed - Email not registred');
//        }
//      } else {
//        console.log("Error: Consult not realized", err);
//        res.send('Login failed');
//      }
//    });
//  });
 
//  app.post('/cadastro', (req, res) => {
//    let name = req.body.name;
//    let email = req.body.email;
//    let password = req.body.password;
   
//    connection.query("INSERT INTO user (user_name, user_email, user_password) VALUES  ('" + name + "', '" + email + "','" + password + "')", function (err, rows, fields) {
//      console.log("Results:", rows);
//      if (!err) {
//        console.log("Successfully sing up");
//        res.sendFile(__dirname + '/html/login.html')
//      } else {
//        console.log("Consult not realized", err);
//        res.send('Login failed');
//      }
//    });
//  });
 
 

 
 