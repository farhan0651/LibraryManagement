const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = express.Router();
const Register = require('./models/userModel')

const userRoutes = require('./routes/users')
const registerRoutes = require('./routes/register')

mongoose.connect('mongodb+srv://Farhan:LibraryManagement@cluster0.vxibd.mongodb.net/Library?retryWrites=true&w=majority', { useNewUrlParser: true })


app.use(morgan('dev'))
app.use(express.static("public"));
app.use(express.static("upload"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//CORS
// app.use('*',function(req,res,next){
//     res.set('Access-Control-Allow-Origin','*');
//     res.set('Access-Control-Allow-Headers','content-type');
//     next();
// })

app.use('/log', userRoutes);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/login.html')
});

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/garden-index.html')
});



app.use('/reg', registerRoutes);

app.listen(8000,function(req,res){
    console.log("Server started");
})

module.exports = app