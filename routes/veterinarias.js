/* 
    Ruta: /api/veterinarias
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');
const { getVeterinarias, 
        crearVeterinaria, 
        actualizarVeterinaria, 
        eliminarVeterinaria } = require('../controllers/veterinarias');

const router = Router();

router.get('/', getVeterinarias );

router.post('/', 
    [],
    crearVeterinaria
);

router.put('/:id', 
    [],
    actualizarVeterinaria 
);

router.delete('/:id',eliminarVeterinaria);

module.exports = router;