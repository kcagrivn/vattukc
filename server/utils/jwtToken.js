// file: server/utils/jwtToken.js

const jwt = require('jsonwebtoken');

const sendToken = (user, statusCode, res) => {
    // 1. Tạo JWT
    const token = user.getJWTToken(); 

    // 2. Thiết lập Cookie (Options) - ĐÃ SỬA LỖI EXPIRES
    const options = {
        // Cookie hết hạn sau 5 ngày (đổi sang miligiây)
        expires: new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true, // Rất quan trọng cho bảo mật
        // Thêm SameSite và Secure cho môi trường phát triển
        sameSite: 'Lax', 
        secure: process.env.NODE_ENV === 'production', // Chỉ dùng HTTPS trong production
    };

    // 3. Gửi phản hồi (Token, User Info, Cookie)
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user: { // Trả về thông tin an toàn
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
        token,
    });
};

module.exports = sendToken;