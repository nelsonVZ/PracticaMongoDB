const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/cliente.controller');
const router = Router();

router.get('/', getClientes);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('tipoDocumento', 'El tipo de documento es obligatorio').not().isEmpty(),
        check('numeroDocumento', 'El número de documento es obligatorio').isNumeric(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearCliente
);

router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('tipoDocumento', 'El tipo de documento es obligatorio').not().isEmpty(),
        check('numeroDocumento', 'El número de documento es obligatorio').isNumeric(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos,
    ],
    actualizarCliente
);

router.delete('/:id', eliminarCliente);

module.exports = router;