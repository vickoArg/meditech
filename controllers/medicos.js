const { response } = require('express');

const getMedicos = (req,res=response) => {
    res.json({
        ok:true,
        msg:'get Medicos'
    })
}

const crearMedico = (req,res=response) => {
    res.json({
        ok:true,
        msg:'crear Medico'
    })
}

const actualizarMedico = (req,res=response) => {
    res.json({
        ok:true,
        msg:'actualizar Medico'
    })
}

const eliminarMedico = (req,res=response) => {
    res.json({
        ok:true,
        msg:'eliminar Medico'
    })
}

module.exports={
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}