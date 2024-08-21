const express = require('express');
const router = express.Router();
const Post = require('../models/blogModel');
const checkToken = require('../helper/verifytoken');

// Create a new blog post
router.post('/post', checkToken, async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        const post = await Post.create({
            ...req.body,
            author: userEmail 
        });

        res.status(200).json({
            status: 'Success',
            post
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

router.get('/all/posts', checkToken, async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        const posts = await Post.find({ author: userEmail });

        res.status(200).json({
            status: 'Success',
            posts
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

router.get('/getOne/:id', checkToken, async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        const blog = await Post.findOne({ _id: req.params.id, author: userEmail });

        if (!blog) {
            return res.status(404).json({
                error: 'No post found for this user with that ID'
            });
        }

        res.status(200).json({
            status: 'Success',
            blog
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.put('/editPost/:id', checkToken, async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        const updatedBlog = await Post.findOneAndUpdate(
            { _id: req.params.id, author: userEmail },
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ error: 'No post found for this user with that ID' });
        }

        res.status(200).json({
            status: 'Success',
            blog: updatedBlog
        });
    } catch (e) {
        res.status(500).json({
            error: e.message
        });
    }
});

router.delete('/deletePost/:id', checkToken, async (req, res) => {
    try {
        const userEmail = req.user.email;

        if (!userEmail) {
            return res.status(403).json({ error: 'User not authenticated' });
        }

        const deletedBlog = await Post.findOneAndDelete({
            _id: req.params.id,
            author: userEmail
        });

        if (!deletedBlog) {
            return res.status(404).json({ error: 'No post found for this user with that ID' });
        }

        res.status(200).json({
            message: 'Post deleted'
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
