const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCategoria, crearCategoria, actualizarCategoria, eliminarCategoria } = require('../controllers/categoria.controller');
const router = Router();

router.get('/', getCategoria);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCategoria
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCategoria
);

router.delete('/:id', eliminarCategoria);
module.exports = router;