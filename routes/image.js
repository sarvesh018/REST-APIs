const express = require('express');
const multer = require('multer');
const Image = require('../models/image');
const authMiddleware = require('../middleware/middleware');

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
    const { name, folder } = req.body;
    const image = new Image({ name, imageUrl: req.file.path, folder, user: req.user._id });
    
    await image.save();
    res.send(image);
});

router.get('/search', authMiddleware, async (req, res) => {
    const { name } = req.query;
    const images = await Image.find({ user: req.user._id, name: { $regex: name, $options: 'i' } });
    res.send(images);
});

module.exports = router;
