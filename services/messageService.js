import mongoose from 'mongoose';
import Message from '../models/Message.js';

const getAllMessages = async() => {
    try {
        return await Message.find().populate('created_by');
    } catch (error) {
        throw error;
    }
}

const storeMessage = async(text, created_by, created_at) => {
    const message = new Message({text: text, created_by: created_by, created_at: created_at});
    return await message.save();
}

export { getAllMessages, storeMessage };