var User = require('../models/users')

function userLogin (req, res) {
  const query = {
      email: req.body.email
  }
  User.find(query)
    .exec()
    .then((doc) => {
        if (doc.password == req.body.password) {
            res.json(doc)
        } else {
            const error = {
                message: 'Invalid credentials'
            }
            res.status(401).json(error)
        }
    })
    .catch((error) => {
        console.log('Error al iniciar sesion', error)
        res.status(500).send(error)
    })
}

// crear un usuario
function createOneUser (req, res) {
  // en las peticiones POST
  // el cuerpo de la peticion se encuentra en
  // req.body
  User.create(req.body)
    .then((doc) => {
        console.log('Usuario creado', doc)
        res.json(doc)
    })
    .catch((error) => {
        console.log('Error al crear usuario', error)
        res.status(500).send(error)
    })
}

// leer/listar todos los usuarios
function listUsers (req, res) {
  User.find({})
    .exec()
    .then((docs) => {
        console.log('Usuarios encontrados', docs)
        res.json(docs)
    })
    .catch((error) => {
        console.log('Error al listar usuarios', error)
        res.status(500).send(error)
    })
}

// leer un usuario
function listOneUser (req, res) {
  User.findById(req.params.id)
    .exec()
    .then((doc) => {
        console.log('Usuario encontrado', doc)
        res.json(doc)
    })
    .catch((error) => {
        console.log('Error al listar un usuario', error)
        res.status(500).send(error)
    })
}

// actualizar un usuario
function updateOneUser (req, res) {
  User.findByIdAndUpdate(req.params.id, req.body)
    .then((doc) => {
        console.log('Usuario actualizado', doc)
        res.json(doc)
    })
    .catch((error) => {
        console.log('Error al actualizar un usuario', error)
        res.status(500).send(error)
    })
}

module.exports = {
  createOneUser, // crear un usuario
  listUsers, // listar usuarios
  listOneUser, // listar un usuario
  updateOneUser, // editar un usuario
  userLogin,
}
