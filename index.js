const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

app.use( cors() );

//lectura y parseo del body
app.use( express.json() );

dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/veterinarias', require('./routes/veterinarias'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto' + process.env.PORT);
});