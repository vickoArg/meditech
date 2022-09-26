/* 
    Ruta: /api/medicos
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, eliminarMedico } = require('../controllers/medicos');

const router = Router();

router.get('/', getMedicos );

router.post('/', 
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario'),
        check('veterinaria', 'El id de la veterinaria debe de ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', 
    [],
    actualizarMedico 
);

router.delete('/:id',eliminarMedico);

module.exports = router;