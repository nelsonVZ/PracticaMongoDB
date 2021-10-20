const { response } = require('express');
const Cliente = require('../models/cliente.model');

const getClientes = async(req, res) => {
    const clientes = await Cliente.find({}, 'nombre numeroDocumento direccion telefono email');
    res.json({
        ok: true,
        clientes
    });
}

const crearCliente = async(req, res = response) => {
    const { nombre, tipoDocumento, numeroDocumento, email } = req.body;
    try {
        const existeEmail = await Cliente.findOne({ email });
        const existeDocumento = await Cliente.findOne({ numeroDocumento });
        if (existeEmail) {
            if (existeDocumento) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El número de documento ya existe'
                });
            }
            return res.status(400).json({
                ok: false,
                mensaje: 'El email ya a sido registrado'
            });
        }

        const cliente = new Cliente(req.body);
        await cliente.save();
        res.json({
            ok: true,
            cliente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }
}
const actualizarCliente = async(req, res = response) => {
    const cid = req.params.id;

    try {
        const clienteDB = await Cliente.findById(cid);
        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un cliente con ese id'
            });
        }

        const { numeroDocumento, email, ...campos } = req.body;
        if (clienteDB.numeroDocumento !== numeroDocumento || clienteDB.email !== email) {
            const existeDocumento = await Cliente.findOne({ numeroDocumento });
            const existeEmail = await Cliente.findOne({ email });
            if (existeDocumento) {
                if (existeEmail) {
                    return res.status(400).json({
                        ok: false,
                        mensaje: 'Ya existe un cliente con este email'
                    });
                }
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un cliente con este número de documento'
                });
            }
        }

        campos.numeroDocumento = numeroDocumento;
        campos.email = email;

        const clienteActualizado = await Cliente.findByIdAndUpdate(cid, campos, { new: true });
        res.json({
            ok: true,
            cliente: clienteActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar cliente'
        });
    }
}

const eliminarCliente = async(req, res = response) => {
    const cid = req.params.id;
    try {
        const clienteDB = await Cliente.findById(cid);
        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un cliente con ese id'
            });
        }
        await Cliente.findByIdAndDelete(cid);
        res.json({
            ok: true,
            mensaje: 'Cliente eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'No es posible eliminar cliente'
        });
    }
}
module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente,
}