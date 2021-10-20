const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConection } = require('./config/database');

//Creamos el servidor express
const app = express();

//Configuracion de cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//Rutas de la API
app.get('/', (req, res) => {
    res.status(400).json({
        ok: true,
        mensaje: 'Bienvenidos a node'
    });
});

app.use('/api/usuarios', require('./routes/usuario.route'));
app.use('/api/login', require('./routes/auth.route'));

/////////////////////////////////rutas agregadas
app.use('/api/categorias', require('./routes/categoria.route'));
app.use('/api/clientes', require('./routes/cliente.route'));
app.use('/api/pedidos', require('./routes/pedido.route'));
app.use('/api/productos', require('./routes/producto.route'));
app.use('/api/detallePedidos', require('./routes/detallePedido.route'));
app.use('/api/proveedores', require('./routes/proveedor.route'));
//app.use('/api/compras', require('./routes/compra.route'));

//Levantamos el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});