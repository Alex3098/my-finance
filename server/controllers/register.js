const { User } = require('../models')

// @desc Register new user
// @route /api/v1/register
// @access Private
exports.registerUser = async (req, res, next) => {
  const { login, email, password } = req.body

  try {
    const user = await User.create({ login, email, password })

    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}
