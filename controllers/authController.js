import passport from 'passport';
import { registerUser, authenticateUser } from '../services/authService.js'

const register = async (req,res) => {
    try {
        const { name, username, password, status, role } = req.body;
        const user = await registerUser(name, username, password, status, role)
        res.status(201).send(`Usuario registrado ${user}` );
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const { user, token } = await authenticateUser(username, password);
      if (!user) return res.status(400).send('Usuario o contraseña incorrectos');
      
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(500).send(`Error en la autenticación ${error}`);
    }
  };

export { register, login };