import dotenv from 'dotenv';
import express from 'express';
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import session from 'express-session';
import passport from './config/passport.js';
import messageRoutes from './routes/messageRoutes.js';
import http from 'http';
import cors from 'cors';
import { Server as SocketIOServer } from 'socket.io';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;

const server = http.createServer(app);
const io = new SocketIOServer(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Middleware de CORS
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Middleware de parseo de cuerpos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de sesión
app.use(session({
    secret: JWT_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Inicialización de Passport
app.use(passport.initialize());
app.use(passport.session());

// Definición de rutas
app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

// Configuración de WebSocket
io.on('connection', (socket) => {
    console.info('Un usuario conectado');

    socket.on('message', (msg) => {
        io.emit('message', msg); // Emite el mensaje a todos los clientes
    });

    socket.on('disconnect', () => {
        console.info('Usuario desconectado');
    });
});

// Arranque del servidor
server.listen(PORT, () => {
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo falló');
});
