/* 
    Ruta: /api/uploads
*/
const { Router } = require('express');
// const expressFileUpload = require('express-fileupload');
const { validarJWT } = require('../helpers/validar-jwt');
const { fileUploads, retornaImagen } = require('../controllers/uploads');
const path = require('path');
const multer = require('multer');

const router = Router();

// router.use(expressFileUpload());
const storage = multer.diskStorage({
    destination:path.join(__dirname,'../uploads')
});
router.use(multer({storage}).array('imagen',3));

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