const { Schema, model } = require('mongoose');


const ProductoSchema = Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    precioVenta: {
        type: Number,
        required: true,
    },
    precioCompra: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        require: true
    },
    proveedor: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedor',
        require: true
    }
});

ProductoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.pid = _id;
    return object;
});


module.exports = model('Producto', ProductoSchema);