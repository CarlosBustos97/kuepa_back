import passport from "passport";
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';  // Asegúrate de que la ruta sea correcta

passport.use(new LocalStrategy(
  async (username, password, done) => {
    
    try {
      const user = await User.findOne({ username });
      if (!user) return done(null, false, { message: 'Usuario incorrecto' });

      const isMatch = await user.comparePassword(password);
      if (!isMatch) return done(null, false, { message: 'Contraseña incorrecta' });

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);  // Aquí uso 'User' correctamente
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
