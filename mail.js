const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post('/send-email', (req, res) => {
  const { nombre, comentarios, email } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Enviar el correo a ti mismo
    subject: 'Nueva Solicitud de Comic/Libro',
    text: `
      Nombre del Libro: ${nombre}
      Comentarios: ${comentarios}
      Enviado por: ${email}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ message: 'Error al enviar el correo' });
    }
    res.status(200).json({ message: 'Correo enviado con éxito' });
  });
});

module.exports = router;