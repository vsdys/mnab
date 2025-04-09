const express = require('express');
const router = express.Router();
const { getArticles, getArticlesByCategory, getArticleById } = require('../controllers/articleController');

router.get('/id/:id', getArticleById);            // ✅ GET /articles/id/1
router.get('/', getArticles);                     // GET /articles
router.get('/:category', getArticlesByCategory);  // GET /articles/boykot, etc.

module.exports = router;