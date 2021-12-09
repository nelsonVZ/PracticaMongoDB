const { response, json } = require('express');

const Categoria = require('../models/categoria.model');

const getCategoria = async(req, res) => {
    const categorias = await Categoria.find();
    res.json({
        ok: true,
        categorias
    });
}
const listarProdDeUnaCategoria = async(req, res = response) => {
    const cateID = req.params.id;
    try {
        const productos = await Categoria.findById(cateID).populate('productos', 'nombre precioVenta stock descripcion');
        if (!productos) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una categoria con ese id'
            });
        }
        //const productos = categoriaDB.populate('productos')
        res.json({
            ok: true,
            productos: productos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }
}
const crearCategoria = async(req, res = response) => {
    const { nombre } = req.body;
    try {
        const existeCategoria = await Categoria.findOne({ nombre });
        if (existeCategoria) {
            return res.status(400).json({
                ok: false,
                mensaje: 'La categoria ya ha sido registrada'
            });
        }

        const categoria = new Categoria(req.body);

        await categoria.save();
        res.json({
            ok: true,
            categoria
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            mensaje: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarCategoria = async(req, res = response) => {
    const cateID = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(cateID);
        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe una categoria con ese id'
            });
        }

        const { nombre, ...campos } = req.body;
        if (categoriaDB.nombre !== nombre) {
            const existeNombre = await Categoria.findOne({ nombre });
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Ya existe una categoria con ese nombre'
                });
            }

        }

        campos.nombre = nombre;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(cateID, campos, { new: true });
        res.json({
            ok: true,
            categoria: categoriaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500), json({
            ok: false,
            mensaje: 'Error al actualizar categoria'
        });
    }
}

const eliminarCategoria = async(req, res = response) => {
    const cateID = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(cateID);
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe una categoria con ese id'
            });
        }
        await Categoria.findByIdAndDelete(cateID);
        res.json({
            ok: true,
            mensaje: 'Categoria eliminada de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500), json({
            ok: false,
            mensaje: 'No es posible eliminar la categoria'
        });
    }
}


module.exports = {
    getCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    listarProdDeUnaCategoria
}