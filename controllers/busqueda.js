const { response } = require('express');
const Usuario = require('../models/usuario');

const busqueda = async(req,res=response) => {
    const valorBusqueda = req.params.busqueda;

    const usuarios = await Usuario.find({
        nombre: busqueda
    });

    res.json({
        ok:true,
        valorBusqueda
    })
}

module.exports={
    busqueda,
}