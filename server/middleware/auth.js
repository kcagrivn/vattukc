// file: server/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Middleware kiểm tra xem người dùng đã đăng nhập chưa
exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const { token } = req.cookies; // Lấy token từ cookie

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Vui lòng đăng nhập để truy cập tài nguyên này."
            });
        }

        // Giải mã token (Giả định SECRET KEY)
        const decodedData = jwt.verify(token, 'JWT_SECRET_KEY'); 

        // Tìm người dùng và lưu thông tin người dùng vào req.user
        // Dùng .select('-password') để không lấy mật khẩu
        req.user = await User.findById(decodedData.id).select('-password'); 

        next(); // Chuyển sang Controller tiếp theo
        
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token không hợp lệ hoặc đã hết hạn."
            });
        }
        
        console.error("LỖI XÁC THỰC:", error.message);
        return res.status(500).json({
            success: false,
            message: "Lỗi Server khi xác thực."
        });
    }
};

// Middleware kiểm tra quyền (Role)
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        // Kiểm tra xem role của user có nằm trong danh sách roles cho phép không
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Quyền: ${req.user.role} không đủ để truy cập tài nguyên này.`,
            });
        }
        next();
    };
};