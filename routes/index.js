const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController.js');
const loginController = require('../controllers/loginController.js');
const createAccountController = require('../controllers/createAccountController.js');
const fundWalletController = require('../controllers/fundWalletController.js');
const transferFundController = require('../controllers/transferFundController.js');
const withdrawFundController = require('../controllers/withdrawFundController.js');

router.post('/', indexController)

router.post('/api/login', loginController)
router.post('/api/create-account', createAccountController)
router.post('/api/fund-wallet', fundWalletController)
router.post('/api/transfer-fund', transferFundController)
router.post('/api/withdraw-fund', withdrawFundController)

module.exports = router;