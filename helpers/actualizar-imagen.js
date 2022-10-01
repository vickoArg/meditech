const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Veterinarias = require('../models/veterinarias');

const borrarImagen = (path) =>{
    if(fs.existsSync(path)){
        fs.unlinkSync(path)
    }
}
const actualizarImagen = async(tipo, id, nombreArchivo) =>{
    let pathViejo;
    switch (tipo){
        case 'medicos':
            const medico = await Medico.findById(id);
            if(!medico){
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            borrarImagen(pathViejo);
            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;
        case 'veterinarias':
            const veterinaria = await Veterinarias.findById(id);
            if(!veterinaria){
                return false;
            }
            pathViejo = `./uploads/veterinarias`;
            borrarImagen(pathViejo);
            veterinaria.img = nombreArchivo;
            await veterinaria.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            pathViejo = `./uploads/usuarios`;
            borrarImagen(pathViejo);
            usuario.img = nombreArchivo;
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