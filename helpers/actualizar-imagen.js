const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Veterinarias = require('../models/veterinarias');

const borrarImagen = (path) =>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
}
const actualizarImagen = async(tipo, id, result, path) =>{
    let dataImage={
        url:result.url,
        id:result.public_id
    };
    switch (tipo){
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                return false;
            }
            // pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(path);
            medico.img = dataImage;
            await medico.save();
            return true;
            break;
        case 'veterinarias':
            const veterinaria = await Veterinarias.findById(id);
            if(!veterinaria){
                return false;
            }
            // pathViejo = `./uploads/veterinarias`;
            borrarImagen(path);
            veterinaria.img = dataImage;
            await veterinaria.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            // pathViejo = `./uploads/usuarios`;
            borrarImagen(path);
            usuario.img = dataImage;
            await usuario.save();
            return true;
            break;
    
        default:
            break;
    }
}

module.exports = {
    actualizarImagen
}