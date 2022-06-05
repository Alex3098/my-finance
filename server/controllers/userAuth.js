const { User } = require('../models')
const cryptoJs = require('crypto-js')

// @desc Register new user
// @route /api/v1/...
// @access Private
exports.registerUser = async (req, res, next) => {
  // get user's info from front
  const { userName, email, password } = req.body
  const hashedPasword = cryptoJs.AES.encrypt(password, process.env.PASS_KEY).toString()

  try {
    // Add new user to db
    const user = await User.create({ login: userName, email, password: hashedPasword })

    return res.status(201).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

// @desc Login user
// @route /api/v1/...
// @access Private
exports.loginUser = async (req, res, next) => {
  // get user's info from front
  const { login, password } = req.body

  try {
    // Find user in db
    const user = await User.findOne({ where: { login } })
    !user && res.status(401).json('Wrong login or password')

    const unhashedPassword = cryptoJs.AES.decrypt(user.password, process.env.PASS_KEY).toString(cryptoJs.enc.Utf8)

    unhashedPassword !== password && res.status(401).json('Wrong login or password')

    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}