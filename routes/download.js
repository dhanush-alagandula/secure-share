const router = require('express').Router();
const File = require('../models/files');
const path = require('path');


router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        if (!file) {
            return res.render('download', { error: 'Link has expired' });
        }

        const filePath = path.join(__dirname, '..', file.path);
        res.download(filePath);
    } catch (err) {
        return res.render('download', { error: 'Something went wrong' });
    }
});

module.exports = router;

