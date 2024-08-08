const Agency = require('../models/Agency');
const Donor = require('../models/Donor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('config');

exports.registerAgency = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let agency = await Agency.findOne({ email });

    if (agency) {
      return res.status(400).json({ msg: 'Agency already exists' });
    }

    agency = new Agency({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    agency.password = await bcrypt.hash(password, salt);

    await agency.save();

    const payload = {
      agencyId: agency._id.toString(),
    };

    jwt.sign(
      payload,
      config.get('JWT_SECRET'),
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, agencyId: payload.agencyId });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Email received:', email);
  console.log('Password received:', password); // No se recomienda en producción

  try {
    let user = await Donor.findOne({ email });
    console.log('Donor found:', user);
    if (!user) {
      user = await Agency.findOne({ email });
      console.log('Agency found:', user);
    }

    let agencyId = null;
    let donorId = null;

    if (!user) {
      console.log('Usuario no encontrado');
      return res.status(400).json({ msg: 'Usuario no encontrado' });
    }

    if (user instanceof Donor) {
      donorId = user._id.toString();
    } else {
      agencyId = user._id.toString();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Credenciales inválidas');
      return res.status(400).json({ msg: 'Credenciales inválidas' });
    }

    const payload = {
      agencyId,
      donorId
    };

    jwt.sign(
      payload,
      config.get('JWT_SECRET'),
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, agencyId, donorId });
      }
    );
  } catch (err) {
    console.error('Error del servidor:', err.message);
    res.status(500).send('Error del servidor');
  }
};
