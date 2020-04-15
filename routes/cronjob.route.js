const router = module.exports = require('express').Router();
const cronjobController = require('../controllers/cronjob.controller');

router.post('/', cronjobController.updateSheet);