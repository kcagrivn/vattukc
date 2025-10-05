// file: server/models/UserModel.js

const mongoose = require('mongoose');
const validator = require('validator'); 
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); // <-- IMPORT JWT

// Định nghĩa Schema (Cấu trúc) cho Người dùng
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Vui lòng nhập Tên của bạn'],
        maxLength: [30, 'Tên không được vượt quá 30 ký tự'],
        minLength: [4, 'Tên phải có ít nhất 4 ký tự'],
    },
    email: {
        type: String,
        required: [true, 'Vui lòng nhập Email'],
        unique: true, // Email phải là duy nhất
        validate: [validator.isEmail, 'Vui lòng nhập Email hợp lệ'],
    },
    password: {
        type: String,
        required: [true, 'Vui lòng nhập Mật khẩu'],
        minLength: [8, 'Mật khẩu phải có ít nhất 8 ký tự'],
        select: false, // Ngăn không cho mật khẩu được trả về trong các truy vấn
    },
    avatar: {
        public_id: {
            type: String,
            default: 'default_id',
        },
        url: {
            type: String,
            default: 'https://via.placeholder.com/150', // Avatar mặc định
        },
    },
    role: {
        type: String,
        default: 'user', // Phân quyền mặc định là người dùng thông thường
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {
    timestamps: true,
    bufferCommands: false,
});

// Mã hóa mật khẩu TRƯỚC khi lưu vào Database
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// Phương thức tạo và trả về JWT
UserSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, 'JWT_SECRET_KEY', { 
        expiresIn: '5d', 
    });
};

// Phương thức để so sánh mật khẩu được nhập với mật khẩu đã mã hóa trong DB
UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;