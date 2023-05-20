const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.renderIndex);
router.get('/auth/github', indexController.redirectToGithubAuth);
router.get('/auth/github/callback', indexController.handleGithubAuthCallback);
router.get('/success', indexController.renderSuccessPage);
router.get('/logout', indexController.logout);

module.exports = router;
