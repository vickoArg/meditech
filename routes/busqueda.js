/* 
    Ruta: /api/todo
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');
const { busqueda } = require('../controllers/busqueda');

const router = Router();

router.get('/:busqueda',
    [
        validarJWT
    ], 
    busqueda 
);

module.exports = router;