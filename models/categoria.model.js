const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    descripcion: {
        type: String
    },
    productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    }],
});

CategoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.cateID = _id;
    return object;
});

module.exports = model('Categoria', CategoriaSchema);