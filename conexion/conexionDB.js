const mysql = require('mysql');
const conexion= mysql.createConnection({
    host : 'localhost',
    database : 'cooperativa',
    user : 'root',
    password : 'password',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err);
        return;
    }
    console.log('Conexion exitosa ' + conexion.threadId);
});

/*conexion.query('SELECT * FROM empleados', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
});*/

module.exports=conexion