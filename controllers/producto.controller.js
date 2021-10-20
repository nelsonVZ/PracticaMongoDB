const { response } = require('express');

const Producto = require('../models/producto.model');

const getProductos = async(req, res = response) => {

    const productos = await Producto.find()
        .populate('categoria', 'nombre')
        .populate('proveedor', 'nombreCompania ruc pais direccion')

    res.json({
        ok: true,
        productos: productos
    });
}

const crearProducto = async(req, res = response) => {
    //console.log(req.body); --> para saber si esta resiviendo los datos
    const { codigo, nombre, precioVenta, precioCompra, stock, descripcion, categoria, proveedor } = req.body;
    try {
        const existeCodigo = await Producto.findOne({ codigo });
        if (existeCodigo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El codigo ya ha sido reguistrado'
            });
        }
        const producto = new Producto(req.body);

        await producto.save();

        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }

}

const actualizarProducto = async(req, res = response) => {
    const pid = req.params.id;

    try {
        const productoDB = await Producto.findById(pid);

        if (!productoDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un producto con ese id'
            });
        }

        const { codigo, ...campos } = req.body;
        if (productoDB.codigo !== codigo) {
            const existeCodigo = await Producto.findOne({ codigo });
            if (existeCodigo) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un producto con este codigo'
                });
            }
        }
        campos.codigo = codigo;

        const productoActualizado = await Producto.findByIdAndUpdate(pid, campos, { new: true });

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar producto'
        });
    }
}

const eliminarProducto = async(req, res = response) => {
    const id = req.params.id;
    try {

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(404).json({
                ok: true,
                mensaje: 'Producto no encontrado por su id',
            });
        }

        await Producto.findByIdAndDelete(id);

        res.json({
            ok: true,
            mensaje: 'Producto elimindo de la DB'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Producto no eliminado, consulte con el administrador'
        });
    }

}
module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
}