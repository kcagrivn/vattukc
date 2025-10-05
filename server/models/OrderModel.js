// file: server/models/OrderModel.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    // 1. THÔNG TIN GIAO HÀNG (Lấy từ Trang Thanh toán)
    shippingInfo: {
        fullName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
    },

    // 2. CÁC MẶT HÀNG ĐÃ ĐẶT (Lấy từ Giỏ hàng Context)
    orderItems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            productId: { // Liên kết với ID sản phẩm thực tế
                type: String, // Tạm thời dùng String vì Database đang là giả lập
                required: true,
            },
            // Thêm image URL hoặc slug để dễ hiển thị trên trang Admin/Khách hàng
        }
    ],

    // 3. THÔNG TIN THANH TOÁN
    paymentMethod: {
        type: String, // Ví dụ: 'cod', 'card'
        required: true,
        default: 'cod',
    },
    itemsPrice: { // Tổng giá trị hàng hóa
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: { // Phí vận chuyển
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: { // Tổng cộng (itemsPrice + shippingPrice)
        type: Number,
        required: true,
        default: 0.0,
    },

    // 4. TRẠNG THÁI ĐƠN HÀNG
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing', // Đang xử lý
        // Index để tăng tốc độ tìm kiếm/lọc trong Admin
        index: true, 
    },
    deliveredAt: Date, // Ngày giao hàng thành công
}, {
    timestamps: true, // Tự động thêm createdAt và updatedAt
    bufferCommands: false, // Giữ nguyên để tránh lỗi timeout DB tạm thời
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;