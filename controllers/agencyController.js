const Agency = require('../models/Agency');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

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
      agency: {
        id: agency.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'), // Asegúrate de que esta línea esté correctamente escrita y que la clave sea 'jwtSecret'
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginAgency = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let agency = await Agency.findOne({ email });

    if (!agency) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, agency.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      agency: {
        id: agency.id,
      },
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'), // Asegúrate de que esta línea esté correctamente escrita y que la clave sea 'jwtSecret'
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
