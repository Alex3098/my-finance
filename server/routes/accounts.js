const express = require('express')

const router = express.Router()
const { addAccount, getAccount } = require('../controllers/accounts')

router
  .route('/create')
  .post(addAccount)

// router
//   .route('/:uuid')
//   .get(getAccount)

module.exports = router
