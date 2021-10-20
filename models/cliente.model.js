const { Schema, model } = require('mongoose');

const ClienteSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    tipoDocumento: {
        type: String,
        require: true
    },
    numeroDocumento: {
        type: Number,
        require: true,
        unique: true
    },
    direccion: {
        type: String,
        require: false
    },
    telefono: {
        type: Number,
        require: false
    },
    email: {
        type: String,
        require: true,
        unique: true
    }
});

ClienteSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.cid = _id;
    return object;
});

module.exports = model('Cliente', ClienteSchema);