const { Schema, model } = require('mongoose');

const ProveedorSchema = Schema({
    nombreCompania: {
        type: String,
        require: true,
        unique: true
    },
    ruc: {
        type: Number,
        require: true,
        unique: true
    },
    pais: {
        type: String,
        require: true
    },
    ciudad: {
        type: String,
        require: true
    },
    direccion: {
        type: String,
        require: true
    },
    telefono: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
}, { collection: 'Proveedores' });

ProveedorSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.prId = _id;
    return object;
});

module.exports = model('Proveedor', ProveedorSchema);