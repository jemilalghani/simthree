const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const authController = require('./authController');
const massive = require('massive');
require('dotenv').config();


const app = express();
app.use(bodyParser.json());
app.use( express.static( __dirname + '/../build' ) );
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))

massive(process.env.CONNECTION_STRING).then(database=>{
    app.set('db', database)
}).catch(error=>{
    console.error('Error connection with DB', error)
})

// auth0 endpoints 
// app.get('/api/profile', userController.getUserData)
app.post('/api/logout', authController.logout);
app.get('/auth/callback', authController.handleCallback);

const SERVER_PORT = 4000
app.listen(SERVER_PORT, ()=>{
    console.log(`Tunin into Port ${SERVER_PORT} 📡`)
})