const express = require('express');
const UserController = require('../controllers/UserController');

const api = express.Router();

/**
 * POST:Para insertar datos y enviar datos sensibles.
 * GET: Para obtener datos.
 * PUT: Modificar datos.
 * DELETE: Eliminar informacion.
 */

 api.get('/saludar', (req, res) => {
    console.log ('Llego a la ruta saludar...');
 });


 //POST:Para insertar datos y enviar datos sensibles.
 api.post('/', UserController.create);
 //GET: Para obtener datos.
 api.get('/', UserController.list);
 //PUT: Modificar datos.
 api.put('/:id', UserController.update);
  //DELETE: Eliminar informacion.
  api.delete('/:id', UserController.deletUser);

 //GET: Para obtener un usuario por su id.
 api.get('/:id', UserController.show);

 module.exports = api; 