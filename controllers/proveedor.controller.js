const { response } = require('express');

const Proveedor = require('../models/proveedor.model');

const getProveedores = async(req, res = response) => {

    const proveedor = await Proveedor.find();
    res.json({
        ok: true,
        proveedor
    });
}

const crearProveedor = async(req, res = response) => {
    const { nombreCompania, ruc, email } = req.body;
    try {
        const existeCompania = await Proveedor.findOne({ nombreCompania });
        const existeRuc = await Proveedor.findOne({ ruc });
        const existeEmail = await Proveedor.findOne({ email });
        if (existeCompania) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La compania con este nombre ya existe'
            });
        }
        if (existeRuc) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El número de RUC ya existe'
            });
        }
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El email ya a sido registrado'
            });
        }

        const proveedor = new Proveedor(req.body);
        await proveedor.save();
        res.json({
            ok: true,
            proveedor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarProveedor = async(req, res = response) => {
    const prId = req.params.id;

    try {
        const proveedorDB = await Proveedor.findById(prId);
        if (!proveedorDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un proveedor con ese id'
            });
        }

        const { nombreCompania, ruc, email, ...campos } = req.body;
        if (proveedorDB.nombreCompania !== nombreCompania || proveedorDB.ruc !== ruc || proveedorDB.email !== email) {
            const existeCompania = await Proveedor.findOne({ nombreCompania });
            const existeRuc = await Proveedor.findOne({ ruc });
            const existeEmail = await Proveedor.findOne({ email });
            if (existeCompania) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'La compania con este nombre ya existe'
                });
            }
            if (existeRuc) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El número de RUC ya existe'
                });
            }
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'El email ya a sido registrado'
                });
            }
        }

        campos.nombreCompania = nombreCompania;
        campos.ruc = ruc;
        campos.email = email;

        const proveedorActualizado = await Proveedor.findByIdAndUpdate(prId, campos, { new: true });
        res.json({
            ok: true,
            proveedor: proveedorActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar proveedor'
        });
    }
}

const eliminarProveedor = async(req, res = response) => {
    const prId = req.params.id;
    try {
        const proveedorDB = await Proveedor.findById(prId);
        if (!proveedorDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un proveedor con ese id'
            });
        }
        await Proveedor.findByIdAndDelete(prId);
        res.json({
            ok: true,
            mensaje: 'Proveedor eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'No es posible eliminar proveedor'
        });
    }
}
module.exports = {
    getProveedores,
    crearProveedor,
    actualizarProveedor,
    eliminarProveedor
}