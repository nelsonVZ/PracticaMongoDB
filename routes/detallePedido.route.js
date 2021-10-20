const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getDetallePedido, crearDetallePedido, actualizarDetallePedido, eliminarDetallePedido } = require('../controllers/detallePedido.controller')

const router = Router();

router.get('/', getDetallePedido);

router.post('/', [
        validarJWT,
        check('numeroDetallePedido', 'El número de detalle de pedido es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('producto', 'El id del producto debe de ser válido').isMongoId(),
        check('pedido', 'El id de pedido debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearDetallePedido
);

router.put('/:id', [
        validarJWT,
        check('numeroDetallePedido', 'El número de detalle de pedido es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('producto', 'El id del producto debe de ser válido').isMongoId(),
        check('pedido', 'El id de pedido debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarDetallePedido
);

router.delete('/:id', eliminarDetallePedido);

module.exports = router;