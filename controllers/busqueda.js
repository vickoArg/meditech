const { response } = require('express');
const Usuario = require('../models/usuario');
const Medico = require('../models/medicos');
const Veterinarias = require('../models/veterinarias');

const busqueda = async(req,res=response) => {
    const valorBusqueda = req.params.busqueda;
    const regex = new RegExp(valorBusqueda, 'i');

    const [usuarios,medicos,veterinarias] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Veterinarias.find({ nombre: regex })
    ]);

    res.json({
        ok:true,
        usuarios,
        medicos,
        veterinarias
    })
}

const getDocumentosColeccion = async(req,res=response) => {
    const tabla         = req.params.tabla;
    const valorBusqueda = req.params.busqueda;
    const regex         = new RegExp(valorBusqueda, 'i');
    let data = [];
    console.log(tabla);
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
            .populate('usuario', 'nombre img')
            .populate('veterinaria', 'nombre img')
            break;
        case 'veterinarias':
            data = await Veterinarias.find({ nombre: regex }).populate('usuario', 'nombre img')
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            break;
        default:
            return res.status(400).json({
                ok:false,
                msg:'La tabla tiene que ser medicos/veterinarias/usuarios'
            }) 
    }
    res.json({
        ok:true,
        data
    })
}

module.exports={
    busqueda,
    getDocumentosColeccion
}