const express = require('express');
const router = express.Router();
const { getArticles, getArticlesByCategory } = require('../controllers/articleController');

router.get('/', getArticles); // GET /articles
router.get('/:category', getArticlesByCategory); // GET /articles/boykot, /articles/para, etc.

module.exports = router;