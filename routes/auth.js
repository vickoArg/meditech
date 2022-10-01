/* 
    Ruta: /api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', 
    [
        check('email', "El correo es obligatorio").isEmail(),
        check('password', "El password es obligatorio").not().isEmpty(),
        validarCampos
    ],
    login
);

router.get( '/renew',
    validarJWT,
    renewToken
)

module.exports = router;