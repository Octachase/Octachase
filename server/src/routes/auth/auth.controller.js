const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')

const generateCode = require('../../utils/generateCode')
const Users = require('../../schemas/Users.schema')
const {
  sendResetPasswordEmail,
  sendVerifyEmail,
} = require('../../libs/nodemailer')

const controllerLoginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await Users.findOne(
    { email },
    { __v: 0, createdAt: 0, updatedAt: 0 }
  )

  if (!user) {
    res.status(401)
    throw new Error('Invalid email or password') // validating email
  }
  const isMatch = await user.comparePassword(password) // validating password
  if (!isMatch) {
    res.status(401)
    throw new Error('Invalid account password')
  }

  // Check if account is verified.If no , send verification email
  if (!user.verified) {
    let code = generateCode()
    await user.storeCode(code)
    await user.save()

    // Send verification email
    const token = jwt.sign(
      { email: user.email, code: user.code },
      process.env.SECRET,
      {
        expiresIn: '2h',
      }
    )

    const link = `${process.env.FRONTEND_URL}/verification?jwt=${token}`
    await sendVerifyEmail({ username: user.firstname, link, email: user.email })

    res.status(403)
    throw new Error(
      'The account is not verified. Please check your email to verify your account'
    )
  }

  // Check if account is suspended
  if (user.suspended) {
    res.status(403)
    throw new Error(
      'Your account has been suspended. Please contact support for assistance.'
    )
  }
  // Login jwt expires in 30 days
  const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
    expiresIn: '30d',
  })
  // Remove password from user
  const {
    password: userPassword,
    verified,
    is_admin,
    suspended,
    ...rest
  } = user?._doc

  res
    .status(200)
    .json({ user: { ...rest, isAdmin: is_admin, suspended }, token })
})
const controllerRegisterUser = asyncHandler(async (req, res) => {
  const { email, firstname, lastname, password } = req.body
  if (!email || !password || !firstname || !lastname) {
    res.status(400)
    throw new Error('Please provide all required information')
  }
  // Check if user with email already exists
  const existingUser = await Users.findOne({ email })
  if (existingUser) {
    res.status(400)
    throw new Error('An account with email already exists')
  }

  // Create new user
  let user = new Users({
    email,
    password,
    firstname,
    lastname,
    verified: false,
  })

  // Add verification
  const code = generateCode()
  await user.storeCode(code)
  // Save user
  user = await user.save()

  const token = jwt.sign(
    { email: user.email, code: user.code },
    process.env.SECRET,
    {
      expiresIn: '2h',
    }
  )
  console.log(token)

  const link = `${process.env.FRONTEND_URL}/verification?jwt=${token}`
  // Send verification email
  await sendVerifyEmail({ username: user.firstname, link, email: user.email })

  res.status(200).json({
    success: true,
    message:
      'Registration was successful. Please check email to verify your account',
  })
})

const verifyAccount = asyncHandler(async (req, res) => {
  let { token } = req.body

  if (!token) {
    res.status(403)
    throw new Error('Please provide a token for verifying account')
  }
  let check = jwt.verify(token, process.env.SECRET)
  if (!check || !check.email || !check.code) {
    res.status(403)
    throw new Error('The provided  verification link is invalid')
  }
  const user = await Users.findOne({ email: check.email })
  if (!user) {
    res.status(404)
    throw new Error("The user doesn't exist")
  }
  if (!user.verified) {
    // Check code
    let valid = user.code == check.code
    if (!valid) {
      res.status(401)
      throw new Error('The provided code is invalid')
    }
  }
  await Users.updateOne(
    { email: check.email },
    { $set: { verified: true }, $unset: { code: null } }
  )
  res.status(200).json({ success: true })
})
const controllerResetPassword = asyncHandler(async (req, res) => {
  let { email } = req.body
  let user = await Users.findOne({ email })
  if (!user) {
    res.status(404)
    throw new Error('There is no user with the provided email')
  }
  // Create new code
  const code = generateCode()

  // Update user
  await user.storeCode(code)
  user = await user.save()
  const token = jwt.sign(
    { email: user.email, code: user.code },
    process.env.SECRET,
    {
      expiresIn: '2h',
    }
  )
  const link = `${process.env.FRONTEND_URL}/set-password?jwt=${token}`
  // Send reset email
  await sendResetPasswordEmail({
    email: user.email,
    link,
    username: user.firstname,
  })

  res.status(200).json({
    success: true,
    message: 'An email has been sent. Check and proceed with reset',
  })
})

const controllerSetPassword = asyncHandler(async (req, res) => {
  let { token, newPassword } = req.body

  if (!token || !newPassword) {
    res.status(401)
    throw new Error('Please provide all required information')
  }
  // Validate token
  let valid = jwt.verify(token, process.env.SECRET)
  if (!valid || !valid.email || !valid.code) {
    res.status(403)
    throw new Error('The provided  verification link is invalid')
  }

  const user = await Users.findOne({ email: valid.email })
  if (!user) {
    res.status(404)
    throw new Error("The user doesn't exist")
  }

  if (!user.verified) {
    // Check code		if (!valid) {
    res.status(401)
    throw new Error(
      'You cannot reset password for an unverified account. Please contact support for more info'
    )
  }

  // Check code against
  if (valid.code !== user.code) {
    res.status(403)
    throw new Error('The provided  verification link is invalid')
  }

  // Update password
  await user.updatePassword(newPassword)
  await user.resetCode()
  await user.save()
  res.status(200).json({
    success: true,
    message: 'Password has been reset successfully. Proceed to login',
  })
})

const changeUserPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) {
    res.status(401)
    throw new Error('Please provide all required information')
  }
  const userFind = await Users.findOne({ _id: req.user._id })
  // Validating current password
  const isMatch = await userFind.comparePassword(currentPassword)

  if (!isMatch) {
    res.status(401)
    throw new Error('The provided current password is invalid')
  }

  // Update user
  await userFind.updatePassword(newPassword)
  await userFind.save()
  res
    .status(200)
    .json({ success: true, message: 'Password changed successfully' })
})

const controllerDeleteAccount = asyncHandler(async (req, res) => {
  await Users.deleteOne({ _id: req.user._id })
  res.status(200).json({ success: true })
})

module.exports = {
  controllerRegisterUser,
  controllerResetPassword,
  controllerSetPassword,
  controllerLoginUser,
  changeUserPassword,
  verifyAccount,
  controllerDeleteAccount,
}
