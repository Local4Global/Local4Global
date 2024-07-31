// controllers/messageController.js

const Message = require('../models/Message');

// Crear un nuevo mensaje
exports.createMessage = async (req, res) => {
  const { sender, receiver, content } = req.body;
  try {
    const message = new Message({
      sender,
      receiver,
      content
    });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos los mensajes
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un mensaje por ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ msg: 'Mensaje no encontrado' });
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un mensaje
exports.updateMessage = async (req, res) => {
  const { content } = req.body;
  try {
    let message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ msg: 'Mensaje no encontrado' });

    message.content = content || message.content;
    await message.save();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar un mensaje
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) return res.status(404).json({ msg: 'Mensaje no encontrado' });

    await message.remove();
    res.status(200).json({ msg: 'Mensaje eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
