import { getAllMessages, storeMessage } from '../services/messageService.js';

const getAll = async(req, res) => {
    getAllMessages()
        .then((messages) => {
            return res.status(200).send(messages);
        })
        .catch((error) => {
            return res.status(500).send(`Hubo un error ${error}`);
        });
};

const store = async(req, res) => {
    const { text, created_by, created_at } = req.body;
    storeMessage(text, created_by, created_at)
        .then((message) => {
            return res.status(200).send(message);
        })
        .catch((error) => {
            return res.status(500).send(`Hubo un error ${error}`);
        });

}

export { getAll, store };