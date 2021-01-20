const express = require('express');

const home_controller = require('../controllers/homepage');
const doujin_controller = require('../controllers/doujin');
const search_controller = require('../controllers/search');
// import md from './Middlewares/user'

const router = express.Router()

router.get('/', home_controller.newest);
router.get('/popular', home_controller.most_viewed);
router.get('/doujin', doujin_controller.doujin);
router.get('/random', doujin_controller.random);
router.get('/totalDoujins', doujin_controller.total_doujins);
router.get('/like', doujin_controller.like);
router.get('/canLike', doujin_controller.can_like);
router.get('/search', search_controller.search);

module.exports = router;