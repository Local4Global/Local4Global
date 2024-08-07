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

exports.loginAgency = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Received Email:', email);
  console.log('Received Password:', password); // No se recomienda en producción

  try {
    let agency = await Agency.findOne({ email });

    if (!agency) {
      console.log('Agency not found');
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, agency.password);
    console.log('Password Match:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

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
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  console.log('Email:', email);
  console.log('Password:', password);

  try {
    let donor = await Donor.findOne({ email });
    let agency = null;
    let agencyId = null;
    let donorId = null;

    if (!donor) {
      agency = await Agency.findOne({ email });
      if (agency) {
        agencyId = agency._id.toString();
      }
    } else {
      donorId = donor._id.toString();
    }

    if (!donor && !agency) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const user = donor || agency;
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = agencyId ? { agencyId } : { donorId };

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
    console.error(err.message);
    res.status(500).send('Server error');
  }
};



