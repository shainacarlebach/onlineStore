const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const path = require('path');

//validate file to ensure its an image

// use multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({
    storage: storage
}).single('file')

module.exports = router;

//upload file into home directory

router.post('/fileupload', (req, res) => {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Error uploading file")
        }

        const file = req.file.filename;
        console.log(file);
        res.send(JSON.stringify(file));

    });
});
router.use(express.static(path.join(__dirname, '../../', 'uploads')))
