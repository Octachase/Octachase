const express = require('express')

const user = require('../../middlewares/user.middleware')
const admin = require('../../middlewares/admin.middleware')
const upload = require('../../libs/multer')

const {
  getLoggedInUser,
  getUserMetrics,
  updateUserProfile,
  updateUserProfileImage,
  getAllUsers,
  getAdminMetrics,
  addProfitToUser,
  getAllUsersWithoutPages,
  suspendUser,
  unsuspendUser,
} = require('./users.controller')

const usersRouter = express.Router()

usersRouter.get('/get-user', user, getLoggedInUser)
usersRouter.get('/get-metrics', user, getUserMetrics)
usersRouter.get('/get-users', user, admin, getAllUsers)
usersRouter.get('/get-users-no-pages', user, admin, getAllUsersWithoutPages)
usersRouter.put('/update-profile', user, updateUserProfile)
usersRouter.put(
  '/update-profile-image',
  user,
  upload.single('image'),
  updateUserProfileImage
)
usersRouter.get('/admin-metrics', user, admin, getAdminMetrics)
usersRouter.put('/add-profit', user, admin, addProfitToUser)
usersRouter.put('/suspend-user', user, admin, suspendUser)
usersRouter.put('/unsuspend-user', user, admin, unsuspendUser)
module.exports = usersRouter
