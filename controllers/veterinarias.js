const { response } = require('express');

const getVeterinarias = (req,res=response) => {
    res.json({
        ok:true,
        msg:'get Veterinarias'
    })
}

const crearVeterinaria = (req,res=response) => {
    res.json({
        ok:true,
        msg:'crear Veterinaria'
    })
}

const actualizarVeterinaria = (req,res=response) => {
    res.json({
        ok:true,
        msg:'actualizar Veterinaria'
    })
}

const eliminarVeterinaria = (req,res=response) => {
    res.json({
        ok:true,
        msg:'eliminar Veterinaria'
    })
}

module.exports={
    getVeterinarias,
    crearVeterinaria,
    actualizarVeterinaria,
    eliminarVeterinaria
}