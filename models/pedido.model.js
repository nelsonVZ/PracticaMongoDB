const { Schema, model } = require('mongoose');


const PedidoSchema = Schema({
    tipoComprobante: {
        type: String,
        required: true
    },
    serieComprobante: {
        type: String,
        required: true,
        unique: true
    },
    numeroComprobante: {
        type: Number,
        required: true,
        unique: true
    },
    fecha: {
        type: String,
        require: true
    },
    impuesto: {
        type: Number,
        required: true
    },
    pedidoTotal: {
        type: Number,
        require: true
    },
    estado: {
        type: String,
        require: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
});

PedidoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.pddId = _id;
    return object;
});


module.exports = model('Pedido', PedidoSchema);