const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req, res)=>{

    const usuarios = await Usuario.find({}, 'nombre email role google');

    res.json({
        ok:true,
        usuarios
    })
}

const crearUsuarios = async(req, res = response)=>{

    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({email:email});
        if(existeEmail){
            return res.status(400).json({
                ok:false,
                msg:'El correo ingresado ya se encuetra actualizado'
            })
        }
        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); 
        usuario.password = bcrypt.hashSync(password, salt);

        //guardar usuarios
        await usuario.save(); 

        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado... revisar logs'
        })
    }
}

const actualizarUsuario = async(req,res = response)=>{
    //TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {
        
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            res.status(404).json({
                ok:false,
                msg:'No existe el usuarios'
            })
        }

        //actualizacion
        const {password,google,email,...campos} = req.body;
        if(usuarioDB.email != email){
            const existeEmail = await Usuario.findOne({email});
            if(existeEmail){
                res.status(400).json({
                    ok:false,
                    msg:'Ya existe ese usuario con ese email'
                })
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

const borrarUsuario = async(req,res=response) =>{

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);
        console.log(usuarioDB);
        if(!usuarioDB){
            res.status(404).json({
                ok:false,
                msg:'No existe el usuario'
            })
        }

        await Usuario.findByIdAndDelete(uid);
        
        res.json({
            ok:true,
            msg:'Usuario eliminado'
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        })
    }
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}