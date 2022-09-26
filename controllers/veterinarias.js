const { response } = require('express');
const Veterinaria = require('../models/veterinarias');

const getVeterinarias = async (req,res=response) => {
    const veterinarias = await Veterinaria.find().populate('usuario','nombre');
    res.json({
        ok:true,
        veterinarias:veterinarias
    })
}

const crearVeterinaria = async(req,res=response) => {

    const uid = req.uid;
    const veterinaria = new Veterinaria({
        usuario:uid,
        ...req.body
    });
    
    try {
        const veterinariaDB = await veterinaria.save();
        res.json({
            ok:true,
            veterinaria:veterinariaDB
        })   
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
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