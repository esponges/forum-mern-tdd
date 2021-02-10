const express = require('express');
const app = express();
const router = express.Router();

const postController = require('../controllers/postController');


router.get('/posts', postController.getAllPosts);
router.get('/posts/:id', postController.getPostById );
router.delete('/posts/:id', postController.deletePost);

router.get('/posts/user/:id', postController.getPostByUserId);

module.exports = router;