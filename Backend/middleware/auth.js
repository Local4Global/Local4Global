const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const tokenParts = authHeader.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ msg: 'Invalid token format' });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, config.get('JWT_SECRET'));
    req.agencyId = decoded.agencyId; // Asigna el agencyId decodificado a req.agencyId
    console.log('Decoded agencyId:', req.agencyId); // Agrega esta línea para verificar el agencyId
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};




