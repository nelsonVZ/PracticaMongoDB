const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    // Leer el Token del header
    //x-token es un header personalizado donde se registrara un token valido
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No hay token en la petición'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}