const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({
    storage,
    limits: { fileSize: 1000000 * 100 } // 100 MB
}).single('myfile');


router.post('/', (req, res) => {

    //store file
    upload(req, res, async (err) => {
        //validate request
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        //database entry
        const file = new File({
            filename: req.file.filename,
            uuid: uuidv4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });

    });
});

router.post('/send', async (req, res) => {
    try {
        //validate request
        const { uuid, emailTo, emailFrom } = req.body;
        if (!uuid || !emailTo || !emailFrom) {
            return res.status(422).send({ error: 'All fields are required' });
        }

        //get data from database
        const file = await File.findOne({ uuid: uuid });
        if (!file) {
            return res.status(404).send({ error: 'File not found' });
        }
        if (file.sender) {
            return res.status(422).send({ error: 'Email already sent once.' });
        }

        file.sender = emailFrom;
        file.receiver = emailTo;
        await file.save();

        //send email
        const sendMail = require('../services/email');
        await sendMail({
            to: emailTo,
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: (file.size / 1000).toFixed(2) + ' KB',
            expires: '24 hours',
            fileName: file.filenamee
        });
        return res.send({ success: true });
    } catch (err) {
        console.error('Error sending file email:', err.message);
        return res.status(500).send({ error: 'Unable to send email right now' });
    }
});


module.exports = router;