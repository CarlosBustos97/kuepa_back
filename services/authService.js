import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const registerUser = async (name, username, password, status, role) => {
    const user = new User({name, username, password, status, role});
    await user.save();
    return user;
}

const authenticateUser = async (username, password) => {
    const user = await User.findOne({username});
    if(!user) return null;

    const isMatch = await user.comparePassword(password);
    if(!isMatch) return null;

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    return {user, token};
}

export { registerUser, authenticateUser };