/* 
    Ruta: /api/todo
*/
const { Router } = require('express');
const { validarJWT } = require('../helpers/validar-jwt');
const { busqueda, getDocumentosColeccion } = require('../controllers/busqueda');

const router = Router();

router.get('/:busqueda',
    [
        validarJWT
    ], 
    busqueda 
);

router.get('/coleccion/:tabla/:busqueda',
    [
        validarJWT
    ], 
    getDocumentosColeccion 
);

module.exports = router;