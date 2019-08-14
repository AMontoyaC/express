var express = require('express');
var router = express.Router();
var controller = require('../controllers/users')

// crear un usuario
router.post('/register', controller.createOneUser)

// iniciar sesion
router.post('/login', controller.userLogin)

// leer/listar todos los usuarios
router.get('/', controller.listUsers);

// leer un usuario
router.get('/:id', controller.listOneUser);

// actualizar un usuario
router.put('/:id', controller.updateOneUser);

module.exports = router;
