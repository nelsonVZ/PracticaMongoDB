const { Schema, model } = require('mongoose');

const detallePedidoSchema = Schema({
    numeroDetallePedido: {
        type: Number,
        require: true,
        unique: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        require: true
    },
    descuento: {
        type: Number,
        require: true,
        default: 0
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    pedido: {
        type: Schema.Types.ObjectId,
        ref: 'Pedido',
        required: true
    },

}, { collection: 'Detalle_Pedido' });

detallePedidoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.dpId = _id;
    return object;
});

module.exports = model('DetallePedido', detallePedidoSchema);