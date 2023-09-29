const express = require ('express');
const router = express.Router(); //router generico que tiene dentro las diferentes rutas
//const controller = require ('../controllers/controllers_Products');
const misConstantes = require ('../controllers/controllerProducts')

const products = misConstantes.jsProducts
const controller = misConstantes.controllers

router.get('/home', (req, res)=> {
    return res.send('Bienvenido!')
  })
router.get('/listar', controller.listar);
router.get('/detalle/:id', controller.detalle);
router.post('/crear', controller.crear);