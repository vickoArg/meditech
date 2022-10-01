const { response } = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

const fileUploads = async(req,res=response) => {
    
    const tipo = req.params.tipo;
    const id = req.params.id;

    const tipoValid = ['medicos','veterinarias','usuarios'];
    if( !tipoValid.includes(tipo) ){
        return res.status(400).json({
            ok:false,
            msg:'No es un medico, veterinaria, usuario'
        })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No se selecciono ningun archivo'
        });
    }

    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extencionArchivo = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ['jpg','png','gif','jpeg'];
    if(!extensionesValidas.includes(extencionArchivo)){
        return res.status(400).json({
            ok:false,
            msg:'No es una extension permitida'
        });
    } 
    const nombreArchivo = `${uuidv4()}.${extencionArchivo}`;
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, function(err) {
        if (err){
            return res.status(500).json({
              ok:false,
              msg:'Error al mover la imagen'
            });
        }
        actualizarImagen(tipo, id, nombreArchivo);
        res.json({
            ok:true,
            msg:'Archivo subido',
            nombreArchivo
        })
    });
}

const retornaImagen = (req, res=response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    }else{
        const pathImgNotFound = path.join(__dirname, `../uploads/image-not-found.jpeg`);
        res.sendFile(pathImgNotFound);
    }
}

module.exports={
    fileUploads,
    retornaImagen
}