// routes/asaRoutes.js

const express = require('express');
const router = express.Router();
const asaController = require('../controllers/asaController');

router.get('/creator/:creatorAddress/asa/holder/:walletAddress', asaController.getHoldersOfCreatorASAsByAddress);
router.get('/:creatorAddress/holders', asaController.getAllHoldersAndOwnedAssets);
router.get('/creator/:creatorAddress/asas', asaController.getCreatedASAsByCreator);

module.exports = router;
