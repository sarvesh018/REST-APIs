const express = require('express');
const Folder = require('../models/folder');
const authMiddleware = require('../middleware/middleware');

const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
    const { name, parent } = req.body;
    const folder = new Folder({ name, parent, user: req.user._id });
    
    await folder.save();
    
    res.send(folder);
});

router.get('/', authMiddleware, async (req, res) => {
    const folders = await Folder.find({ user: req.user._id }).populate('parent');
    res.send(folders);
});

module.exports = router;
