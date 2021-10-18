
const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const passport = require('passport');

// ruuting modulos
const userRounting = require('./routes/api/user')
const rankingRoutes = require('./routes/api/ranking')


//Creamos un app object global
var app = express();


// Conectamos a BBDD
conectarDB();

//Passport
require('./models/user');
require('./config/passport');

// Configuramos el puerto
const port = process.env.PORT || 4000


//Para poder recivir peticiones externas
app.use(cors());


app.use(express.json());

//Lanzamos rutas modulos

app.use('/api/user', userRounting);
app.use('/api/ranking',rankingRoutes);

app.listen( port, '0.0.0.0', () => { 
    console.log(`El servidor está corriendo perfectamente en el puerto ${port}`);
})