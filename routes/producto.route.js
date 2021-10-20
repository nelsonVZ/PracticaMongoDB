const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getProductos, crearProducto, actualizarProducto, eliminarProducto } = require('../controllers/producto.controller');


const router = Router();

router.get('/', getProductos);

router.post('/', [
        validarJWT,
        check('codigo', 'El codigo del producto es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('precioVenta', 'El precio de venta es obligatorio').not().isEmpty(),
        check('precioCompra', 'El precio de compra es obligatorio').not().isEmpty(),
        check('stock', 'El stock es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('categoria', 'El id de la categoria debe de ser válido').isMongoId(),
        check('proveedor', 'El id del proveedor debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearProducto
);

router.put('/:id', [
        validarJWT,
        check('codigo', 'El codigo del producto es obligatorio').not().isEmpty(),
        check('nombre', 'El nombre del producto es obligatorio').not().isEmpty(),
        check('precioVenta', 'El precio de venta es obligatorio').not().isEmpty(),
        check('precioCompra', 'El precio de compra es obligatorio').not().isEmpty(),
        check('stock', 'El stock es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('categoria', 'El id de la categoria debe de ser válido').isMongoId(),
        check('proveedor', 'El id del proveedor debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarProducto
);

router.delete('/:id', eliminarProducto);

module.exports = router;