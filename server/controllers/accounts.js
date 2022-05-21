const { User, Account } = require('../models')

// @desc Add new payment account
// @route /api/v1/accounts
// @access Private
exports.addAccount = async (req, res, next) => {
  const { name, balance, currency, account_type, inc_total_balance, user_uuid } = req.body

  try {
    const user = await User.findOne({ where: { user_uuid } })

    const account = await Account.create({ name, balance, currency, account_type, inc_total_balance, user_uuid: user.user_uuid })

    return res.json(account)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

// @desc Get all payment accounts by user
// @route /api/v1/accounts:uuid
// @access Private
exports.getAccount = async (req, res, next) => {
  const userUuid = req.params.uuid
  console.log(userUuid);
  try {
    const accs = await Account.findAll({ 
      where: { user_uuid: userUuid },
      include: 'users',
     })
    return res.json(accs)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}