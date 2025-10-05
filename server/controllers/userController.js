// file: server/controllers/userController.js

const User = require('../models/UserModel');
const { handleCacheError } = require('../utils/errorHandler'); 
const sendToken = require('../utils/jwtToken'); // Import hàm gửi token qua cookie
const mongoose = require('mongoose');

// -----------------------------------------------------
// 1. ĐĂNG KÝ NGƯỜI DÙNG (Register) - Đang dùng hàm TEST
// -----------------------------------------------------

// TẠM THỜI: Dùng hàm TEST để BUỘC Express nhận diện route POST
exports.registerUserTest = async (req, res) => {
    // Chỉ trả về thành công giả định để tạo Token và User ID giả lập an toàn
    const mockUser = {
        _id: '660000000000000000000001', 
        name: req.body.name || 'Test User',
        email: req.body.email || 'test@vattukc.com',
        role: 'user',
        // Hàm tạo token giả lập: Cần tồn tại để sendToken hoạt động
        getJWTToken: () => 'MOCK_JWT_TOKEN_SUCCESS', 
    };

    // Gọi hàm gửi token (giả định thành công)
    sendToken(mockUser, 201, res);
};


// HÀM ĐĂNG KÝ THỰC TẾ (Đang bị tắt tạm thời)
/*
exports.registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        // ... (Logic tạo User và gửi token) ...
    } catch (error) {
        // ... (Logic xử lý lỗi) ...
    }
};
*/

// -----------------------------------------------------
// 2. ĐĂNG NHẬP NGƯỜI DÙNG (Login) - LOGIC ĐẦY ĐỦ
// -----------------------------------------------------

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Vui lòng nhập Email và Mật khẩu."
        });
    }

    try {
        // 1. Tìm người dùng theo email và lấy mật khẩu
        const user = await User.findOne({ email }).select('+password');
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email hoặc Mật khẩu không hợp lệ."
            });
        }
        
        // 2. So sánh mật khẩu
        const isPasswordMatched = await user.comparePassword(password);
        
        if (!isPasswordMatched) {
             return res.status(401).json({
                success: false,
                message: "Email hoặc Mật khẩu không hợp lệ."
            });
        }
        
        // 3. Đăng nhập thành công: Gửi JWT Token qua Cookie
        sendToken(user, 200, res);

    } catch (error) {
        if (error.message.includes('bufferCommands')) {
            return handleCacheError(res, 'Lỗi Server khi đăng nhập.');
        }
        console.error("LỖI ĐĂNG NHẬP:", error.message);
        res.status(500).json({
            success: false,
            message: "Lỗi Server."
        });
    }
};

// *Chú ý: Đảm bảo file userRoutes.js đang gọi registerUserTest*