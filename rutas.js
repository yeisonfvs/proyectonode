const router = require('express').Router()
const { Router } = require('express');
const conexion = require('./conexion/conexionDB')

//get documentos
router.get('/documentos', (req, res)=>{

    let sql = 'select * from archivos '
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
}) ;

//get un archivo
router.get('/documentos/:id',(req, res)=>{
    const {id} = req.params
    let sql ='select * from archivos where id_archivo = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

//agregar documento
router.post('/documentos',(req, res)=>{
    const{fecha_registro,id_empleado,tipo,nombre,ruta,id_cliente} = req.body

    let sql = `insert into archivos(fecha_registro, id_empleado, tipo, nombre, ruta, id_cliente)
     values('${fecha_registro}','${id_empleado}','${tipo}','${nombre}','${ruta}','${id_cliente}')`
     conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'documento agregador'})
        }
    })
});

//eliminar
router.delete('/documentos/:id',(req, res)=>{
    const{id}=req.params
    
    let sql =`delete from archivos where id_archivo = '${id}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'documento eliminado'})
        }
    })
});

//modificar
router.put('/documentos/:id',(req, res)=>{
    const{id}=req.params
    const{fecha_registro,id_empleado,tipo,nombre,ruta,id_cliente} = req.body
    let sql = `update archivos set
               fecha_registro ='${fecha_registro}'
               id_empleado = '${id_empleado}'
               tipo = '${tipo}'
               nombre ='${nombre}'
               ruta = '${ruta}'
               id_cliente = '${id_cliente}'
               where id_archivo = '${id}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'documento modificado'})
        }
    })


})

module.exports= router;


// clientes

//get clientes
router.get('/clientes', (req, res)=>{

    let sql = 'SELECT c.id_cliente, t.nombres,t.apellidos,t.documento,t.telefono,t.direccion,t.correo,c.fecha_vinculacion from clientes AS c INNER JOIN terceros AS t ON t.id_tercero = c.id_tercero'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
}) ;

//get un cliente
router.get('/clientes/:id',(req, res)=>{
    const {id} = req.params
    let sql ='SELECT c.id_cliente, t.nombres,t.apellidos,t.documento,t.telefono,t.direccion,t.correo,c.fecha_vinculacion from clientes AS c INNER JOIN terceros AS t ON t.id_tercero = c.id_tercero where id_cliente = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
});

//agregar cliente
router.post('/clientes',(req, res)=>{
    const{id_cliente,id_tercero,fecha_vinculacion,nombres,apellidos,id_tipo_documento,documento,telefono,direccion,correo } = req.body

    let sql = `INSERT INTO clientes (id_cliente, id_tercero,fecha_vinculacion)
     values('${id_cliente}','${id_tercero}','${fecha_vinculacion}') SELECT last_insert_id() INTO @id;
     INSERT INTO terceros (id_tercero,nombres,apellidos,id_tipo_documento,documento, telefono, direccion,correo) values
     ('${id_tercero}','${nombres}','${apellidos}','${id_tipo_documento}','${documento}','${telefono}','${direccion}','${correo}')`
     conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'documento agregador'})
        }
    })
});

//eliminar
router.delete('/clientes/:id',(req, res)=>{
    const{id}=req.params
    
    let sql =`delete from archivos where id_cliente = '${id}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'cliente eliminado'})
        }
    })
});

//modificar
router.put('/clientes/:id',(req, res)=>{
    const{id}=req.params
    const{nombres,apellidos,documento,telefono,direccion,correo,fecha_vinculacion} = req.body
    let sql = `update clientes set
               nombres ='${nombres}'
               apellidos = '${apellidos}'
               documento= '${documento}'
               telefono='${telefono}'
               direccion = '${direccion}'
               correo = '${correo}'
               fecha_vinculacion = '${fecha_vinculacion}'
               where id_cliente = '${id}'`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json({status: 'cliente modificado'})
        }
    })


})
