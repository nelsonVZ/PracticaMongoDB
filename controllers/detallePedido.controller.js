const { response } = require('express');

const DetallePedido = require('../models/detallePedido.model');

const getDetallePedido = async(req, res = response) => {

    const detallePedido = await DetallePedido.find()
        .populate('producto', 'nombre precioVenta stock descripcion categoria')
        .populate('pedido', 'fecha impuesto pedidoTotal estado')

    res.json({
        ok: true,
        detallePedido: detallePedido
    });
}

const crearDetallePedido = async(req, res = response) => {
    const { numeroDetallePedido, cantidad, precio, producto, pedido } = req.body;
    try {
        const existeNumeroDetalle = await DetallePedido.findOne({ numeroDetallePedido });
        if (existeNumeroDetalle) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El número de detalle de pedido ya ha sido reguistrado'
            });
        }
        const detallePedido = new DetallePedido(req.body);

        await detallePedido.save();

        res.json({
            ok: true,
            detallePedido
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }

}

const actualizarDetallePedido = async(req, res = response) => {
    const dpId = req.params.id;

    try {
        const detallePedidoDB = await DetallePedido.findById(dpId);

        if (!detallePedidoDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un detalle de pedido con ese id'
            });
        }

        const { numeroDetallePedido, ...campos } = req.body;
        if (detallePedidoDB.numeroDetallePedido !== numeroDetallePedido) {
            const existeNumDetalle = await DetallePedido.findOne({ numeroDetallePedido });
            if (existeNumDetalle) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe un detalle de pedido con este número'
                });
            }
        }
        campos.numeroDetallePedido = numeroDetallePedido;
        const detallePedidoActualizado = await DetallePedido.findByIdAndUpdate(dpId, campos, { new: true });

        res.json({
            ok: true,
            detallePedido: detallePedidoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar detalle de pedido'
        });
    }
}

const eliminarDetallePedido = async(req, res = response) => {
    const id = req.params.id;
    try {

        const detallePedido = await DetallePedido.findById(id);

        if (!detallePedido) {
            return res.status(404).json({
                ok: true,
                mensaje: 'Detalle de pedido no encontrado por su id',
            });
        }

        await DetallePedido.findByIdAndDelete(id);

        res.json({
            ok: true,
            mensaje: 'Detalle de pedido eliminado de la DB'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Detalle de pedido no eliminado, consulte con el administrador'
        });
    }

}
module.exports = {
    getDetallePedido,
    crearDetallePedido,
    actualizarDetallePedido,
    eliminarDetallePedido,
}