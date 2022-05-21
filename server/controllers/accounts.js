const { User, Account } = require('../models')

// @desc Add new payment account
// @route /api/v1/accounts/create
// @access Private
exports.addAccount = async (req, res, next) => {
  // Get data from frontend
  const { name, balance, currency, accountType, includeTotalBalance, userUuid } = req.body

  try {
    const user = await User.findOne({ where: { uuid: userUuid } })

    const account = await Account.create({ name, balance, currency, accountType, includeTotalBalance, userId: user.id })

    return res.json(account)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

// @desc Get all payment accounts by user
// @route /api/v1/accounts:uuid
// @access Private
// exports.getAccount = async (req, res, next) => {
//   const userUuid = req.params.uuid

//   try {
//     const accs = await Account.findAll({ 
//       where: { user_uuid: userUuid },
//       include: 'users',
//      })
//     return res.json(accs)
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json(error)
//   }
// }