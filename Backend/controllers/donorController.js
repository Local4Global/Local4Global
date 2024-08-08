const Donor = require('../models/Donor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

exports.registerDonor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let donor = await Donor.findOne({ email });

    if (donor) {
      return res.status(400).json({ msg: 'Donor already exists' });
    }

    donor = new Donor({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    donor.password = await bcrypt.hash(password, salt);

    await donor.save();

    const payload = {
      donor: {
        id: donor.id,
      },
    };

    jwt.sign(
      payload,
      config.get('JWT_SECRET'),
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

exports.loginDonor = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let donor = await Donor.findOne({ email });

    if (!donor) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, donor.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      donor: {
        id: donor.id,
      },
    };

    jwt.sign(
      payload,
      config.get('JWT_SECRET'),
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

exports.getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};





