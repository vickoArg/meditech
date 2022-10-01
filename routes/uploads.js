/* 
    Ruta: /api/uploads
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../helpers/validar-jwt');
const { fileUploads, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());

router.get('/:tipo/:foto',
    [
        validarJWT
    ], 
    retornaImagen 
);

router.put('/:tipo/:id',
    [
        validarJWT
    ], 
    fileUploads 
);

module.exports = router;