require('./conexion/conexionDB');
const express = require('express');
const cors = require('cors');

const port = (process.env.port || 3001);

const app = express();

//admitir
app.use(express.json())
app.use(cors())

//config
app.set('port', port);

//rutas
app.use('/api',require('./rutas'));

//iniciar express
app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('error al iniciar servidor: '+error);

    }else{
        console.log('servidor iniciado en el puerto: '+port);
    }
});

/*const express = require('express');
const app = express();

app.get('/',(req, res)=>{
    res.send('hola')
});

app.listen(3001, ()=>{
    console.log('server corriendo')
});*/