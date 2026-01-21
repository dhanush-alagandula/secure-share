const router = require('express').Router();
const File = require('../models/file');
const path = require('path');
const fs = require('fs');


router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.render('download', { error: 'Link has expired' });
        }

        const filePath = path.join(__dirname, '..', file.path);

        // If the file has been removed from disk, return an error instead of throwing
        if (!fs.existsSync(filePath)) {
            return res.render('download', { error: 'File is no longer available 😔😔' });
        }

        res.download(filePath);
    } catch (err) {
        return res.render('download', { error: 'Something went wrong' });
    }
});

module.exports = router;

