const express = require('express');
const app = express();

//Invocamos a la conexion de la DB
const conexion = require('./database/db');


//4- Estableciendo el motor de plantillas
app.set('view engine','ejs');

//Para poder capturar los datos del formulario (sin urlencoded nos devuelve "undefined")
app.use(express.urlencoded({extended:false}));
//además le decimos a express que vamos a usar json
app.use(express.json());


 //Establecemos las rutas para las VISTAS usando un archivo aparte (router.js) y la clase Router()
app.use('/', require('./router'));


app.listen(3000, ()=>{
    console.log('SERVER corriendo en http://localhost:3000');
});