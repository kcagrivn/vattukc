// file: server/models/ProductModel.js

const mongoose = require('mongoose');

// Định nghĩa Schema (Cấu trúc) cho Sản phẩm
const ProductSchema = new mongoose.Schema({
    // 1. Thông tin cơ bản
    name: {
        type: String,
        required: [true, 'Tên sản phẩm là bắt buộc'],
        trim: true,
        maxLength: [100, 'Tên sản phẩm không được vượt quá 100 ký tự'], // <-- DẤU PHẨY CẦN THIẾT
        index: true, // Thêm chỉ mục tìm kiếm
    },
    slug: {
        type: String,
        unique: true,
        required: true, 
    },
    description: {
        type: String,
        required: [true, 'Mô tả sản phẩm là bắt buộc'],
        index: true, // Thêm chỉ mục tìm kiếm
    },
    price: {
        type: Number,
        required: [true, 'Giá sản phẩm là bắt buộc'],
        min: [0, 'Giá không thể là số âm']
    },
    stock: { 
        type: Number,
        required: [true, 'Số lượng tồn kho là bắt buộc'],
        default: 0,
        min: [0, 'Tồn kho không thể là số âm']
    },
    
    // 2. Phân loại 
    category: {
        type: String, 
        required: [true, 'Danh mục sản phẩm là bắt buộc'],
        trim: true,
        index: true, // Thêm chỉ mục lọc
    },
    brand: {
        type: String,
        trim: true,
        index: true, // Thêm chỉ mục lọc
    },
    
    // 3. Hình ảnh
    images: [
        {
            public_id: { 
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],

    // 4. Đánh giá và xếp hạng
    ratings: { 
        type: Number,
        default: 0
    },
    numOfReviews: { 
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
    bufferCommands: false 
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;