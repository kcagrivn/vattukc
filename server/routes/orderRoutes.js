// file: server/routes/orderRoutes.js (Thay thế toàn bộ nội dung)

const express = require('express');
const { newOrder, getAllOrders, getSingleOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth'); // <-- IMPORT MIDDLEWARE

const router = express.Router();

// 1. Route POST: Tạo đơn hàng mới (KHÔNG cần bảo vệ)
router.route('/order/new').post(newOrder);

// 2. Route GET: Lấy tất cả đơn hàng (Cho Admin Dashboard)
// YÊU CẦU ĐĂNG NHẬP VÀ QUYỀN ADMIN
router.route('/admin/orders')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAllOrders);

// 3. Route GET: Lấy chi tiết đơn hàng (Cho Admin và Khách hàng)
// YÊU CẦU ĐĂNG NHẬP
router.route('/admin/orders/:id')
    .get(isAuthenticatedUser, getSingleOrder); 

module.exports = router;