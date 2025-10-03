// file: server/routes/userRoutes.js

const express = require('express');
// Đảm bảo import cả hàm Test và hàm Login
const { registerUserTest, loginUser } = require('../controllers/userController'); 
const router = express.Router();

// Route POST: Đăng ký (Vẫn dùng hàm Test để đảm bảo thành công)
router.route('/register').post(registerUserTest); 

// Route POST: Đăng nhập - ĐÃ ĐỔI TÊN THÀNH SIGN-IN
router.route('/sign-in').post(loginUser); // <-- ROUTE MỚI ĐỘC ĐÁO

module.exports = router;