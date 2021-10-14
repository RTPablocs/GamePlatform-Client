const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('BBDD Conectada!!');
        
    } catch (error) {
        console.log(error);
        console.log('Error con la BDDD , inicia mongodb');
        process.exit(1)
    }
}

module.exports = conectarDB;