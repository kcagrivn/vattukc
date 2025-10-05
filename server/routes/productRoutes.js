// file: server/routes/productRoutes.js (Thay thế toàn bộ nội dung)

const express = require('express');
const { 
    createProduct, 
    getAllProducts, 
    getAdminProducts,
    updateProduct, // <-- IMPORT UPDATE
    deleteProduct // <-- IMPORT DELETE
} = require('../controllers/productController'); 
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth'); // <-- IMPORT MIDDLEWARE
const router = express.Router(); 

// 1. Route POST: Thêm sản phẩm mới (Đã bảo vệ)
router.route('/product/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

// 2. Route GET: Lấy danh sách tất cả sản phẩm (Cho Admin)
// YÊU CẦU ĐĂNG NHẬP VÀ QUYỀN ADMIN (ĐÃ KÍCH HOẠT LẠI)
router.route('/admin/products')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);
    
// 3. Route GET: Lấy danh sách tất cả sản phẩm (Cho Khách hàng, đã tắt tạm thời)
// router.route('/products').get(getAllProducts); 

// 4. Route SỬA (PUT) và XÓA (DELETE)
// YÊU CẦU ĐĂNG NHẬP VÀ QUYỀN ADMIN
router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct) // Route SỬA
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct); // Route XÓA

module.exports = router;