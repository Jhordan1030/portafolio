const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Docente } = require('../models');

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const docente = await Docente.findOne({ where: { username } });
        if (!docente) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const validPassword = await bcrypt.compare(password, docente.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: docente.id, username: docente.username },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            id: docente.id,
            username: docente.username,
            nombre: docente.nombre_completo,
            token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
};

module.exports = { login };