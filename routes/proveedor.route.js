const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const { validarJWT } = require('../middlewares/validar-jwt');

const { getProveedores, crearProveedor, actualizarProveedor, eliminarProveedor } = require('../controllers/proveedor.controller');

const router = Router();

router.get('/', getProveedores);

router.post('/', [
        validarJWT,
        check('nombreCompania', 'El nombre de la compania es obligatorio').not().isEmpty(),
        check('ruc', 'El RUC es obligatorio').isNumeric(),
        check('pais', 'El pais es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El numero telefonico es obligatorio').isNumeric(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    crearProveedor
);

router.put('/:id', [
        validarJWT,
        check('nombreCompania', 'El nombre de la compania es obligatorio').not().isEmpty(),
        check('ruc', 'El RUC es obligatorio').isNumeric(),
        check('pais', 'El pais es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatorio').not().isEmpty(),
        check('direccion', 'La direccion es obligatorio').not().isEmpty(),
        check('telefono', 'El numero telefonico es obligatorio').isNumeric(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampos
    ],
    actualizarProveedor
);

router.delete('/:id', eliminarProveedor);

module.exports = router;