const express = require('express');

const { signup, login, protect, restrictTo } = require('../controller/authController');
const { activateUser, updateUser, deActivateUser } = require('../controller/userController');

const router = express.Router()

router.route('/signup').post(signup);
router.route('/login').post(login);

router.route('/activate').patch(protect, restrictTo('ADMIN'), activateUser)
router.route('/activate').patch(protect, restrictTo('ADMIN'), deActivateUser
)
router.route('/update').patch(protect, updateUser);



module.exports = router;