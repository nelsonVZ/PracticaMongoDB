const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario.model');


const getUsuarios = async(req, res) => {
    //const usuarios = await Usuario.find();
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        usuarios
    });
}

const crearUsuario = async(req, res = response) => {
    //console.log(req.body); --> para saber si esta resiviendo los datos
    const { email, password, nombre } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El email ya ha sido reguistrado'
            });
        }

        //creamos un objeto de la clase model Usuario
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //indicamos a mongoose que registre al usuario en la bd
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'no existe un usuario con ese id'
            });
        }

        //Codigo previo a la actualizacion
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un usuario con este email'
                });
            }
        }

        campos.email = email;

        //actualizacion de datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });
        res.json({
            ok: true,
            usuarioActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            mensaje: 'Error al actualizar usuario'
        });
    }
}

const eliminarUsuario = async(req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'no existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            mensaje: 'Usuario eliminado de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'No es posible eliminar usuario'
        });
    }
}
module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
}