const { response } = require('express');
const Medicos = require('../models/medicos');

const getMedicos = async(req,res=response) => {
    const medicos = await Medicos.find().populate('usuario','nombre img').populate('veterinaria','nombre');
    res.json({
        ok:true,
        medicos:medicos
    })
}

const crearMedico = async(req,res=response) => {

    const uid = req.uid
    const medico = new Medicos({
        usuario:uid,
        ...req.body
    })
    try {
        const medicoDB = await medico.save();
        res.json({
            ok:true,
            medico:medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el admin'
        })
    }
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