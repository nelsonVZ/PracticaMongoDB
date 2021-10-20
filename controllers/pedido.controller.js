const { response } = require('express');
const Pedido = require('../models/pedido.model');



const getPedido = async(req, res = response) => {

    const pedido = await Pedido.find()
        .populate('usuario', 'nombre email img')
        .populate('cliente', 'nombre direccion email')

    res.json({
        ok: true,
        pedido: pedido
    });
}
const crearPedido = async(req, res = response) => {

    const uid = req.uid;
    const pedido = new Pedido({
        usuario: uid,
        ...req.body
    });

    try {
        const pedidoDB = await pedido.save();
        res.json({
            ok: true,
            pedido: pedidoDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'No se puede crear pedido, consulte con el administrador'
        });
    }
}

const actualizarPedido = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const pedido = await Pedido.findById(id);

        if (!pedido) {
            return res.status(404).json({
                ok: true,
                mensaje: 'Pedido no encontrado por id',
            });
        }

        const cambiosPedido = {
            ...req.body,
            usuario: uid
        }

        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, cambiosPedido, { new: true });
        res.json({
            ok: true,
            pedido: pedidoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'No se puede actualizar pedido, consulte con el administrador'
        })
    }
}

const eliminarPedido = async(req, res = response) => {
    const id = req.params.id;
    try {

        const pedido = await Pedido.findById(id);

        if (!pedido) {
            return res.status(404).json({
                ok: true,
                mensaje: 'Pedido no encontrado por id',
            });
        }

        await Pedido.findByIdAndDelete(id);

        res.json({
            ok: true,
            mensaje: 'Pedido eliminado de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Pedido no puede eliminarse, consulte con el administrador'
        })
    }

}

module.exports = {
    getPedido,
    crearPedido,
    actualizarPedido,
    eliminarPedido,
}