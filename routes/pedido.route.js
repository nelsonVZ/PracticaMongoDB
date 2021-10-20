const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getPedido, crearPedido, actualizarPedido, eliminarPedido } = require('../controllers/pedido.controller');

const router = Router();

router.get('/', getPedido);

router.post('/', [
        validarJWT,
        check('tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
        check('serieComprobante', 'La serie de comprobante es obligatorio').not().isEmpty(),
        check('numeroComprobante', 'El número de comprobante es obligatorio').isNumeric(),
        check('fecha', 'La fecha es requerida').not().isEmpty(),
        check('impuesto', 'El impuesto es obligatorio').not().isEmpty(),
        check('pedidoTotal', 'El monto es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('cliente', 'El id del cliente debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearPedido
);

router.put('/:id', [
        validarJWT,
        check('tipoComprobante', 'El tipo de comprobante es obligatorio').not().isEmpty(),
        check('serieComprobante', 'La serie de comprobante es obligatorio').not().isEmpty(),
        check('numeroComprobante', 'El número de comprobante es obligatorio').isNumeric(),
        check('fecha', 'La fecha es requerida').not().isEmpty(),
        check('impuesto', 'El impuesto es obligatorio').not().isEmpty(),
        check('pedidoTotal', 'El monto es obligatorio').not().isEmpty(),
        check('estado', 'El estado es obligatorio').not().isEmpty(),
        check('cliente', 'El id del cliente debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarPedido
);

router.delete('/:id', eliminarPedido);

module.exports = router;