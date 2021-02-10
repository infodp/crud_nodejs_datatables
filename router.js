const express = require('express');
const router = express.Router();

//Invocamos a la conexion de la DB
const conexion = require('./database/db');

//RUTA PARA MOSTRAR TODOS LOS REGISTROS
router.get('/', (req, res)=>{           
     conexion.query('SELECT * FROM users',(error, results)=>{
        if(error){
            throw error;
        } else {                                                                
            res.render('index.ejs', {data:results});                                               
        }   
    })
})

//ruta para enviar los datos en formato json
router.get('/data', (req, res)=>{     
    conexion.query('SELECT * FROM users',(error, results)=>{
        if(error){
            throw error;
        } else {                                                   
            data = JSON.stringify(results);
            res.send(data);          
        }   
    })
})

//RUTA QUE NOS LLEVA AL FORMULARIO PARA DAR DE ALTA UN NUEVO REGISTRO
router.get('/create', (req,res)=>{
    res.render('create');
})

//RUTA PARA EDITAR UN REGISTRO SELECCIONADO
router.get('/edit/:id', (req,res)=>{    
    const id = req.params.id;
    conexion.query('SELECT * FROM users WHERE id=?',[id] , (error, results) => {
        if (error) {
            throw error;
        }else{            
            res.render('edit.ejs', {user:results[0]});            
        }        
    });
});

//RUTA PARA ELIMINAR UN REGISTRO SELECCIONADO
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    conexion.query('DELETE FROM users WHERE id = ?',[id], (error, results)=>{
        if(error){
            console.log(error);
        }else{           
            res.redirect('/');         
        }
    })
});

//RUTA para contacto
router.get('/contacto', (req,res)=>{
    res.render('contacto');
})

//Invocamos los metodos para el CRUD
const crud = require('./controllers/crud');
const { json } = require('express');

// usamos router.post porque en el formulario el method="POST"
router.post('/save', crud.save);
router.post('/update', crud.update);



module.exports = router;