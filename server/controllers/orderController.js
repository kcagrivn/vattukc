// file: server/controllers/orderController.js

const Order = require('../models/OrderModel');
// IMPORT HÀM MỚI TỪ UTILS
const { handleCacheError } = require('../utils/errorHandler'); // <-- SỬA LỖI ĐƯỜNG DẪN VÀ IMPORT

// -----------------------------------------------------
// 1. TẠO ĐƠN HÀNG MỚI (POST - Dùng bởi Trang Thanh toán)
// -----------------------------------------------------

exports.newOrder = async (req, res, next) => {
    // Dữ liệu cần thiết được gửi từ Frontend (req.body)
    const { 
        shippingInfo, 
        orderItems, 
        paymentMethod, 
        itemsPrice, 
        shippingPrice, 
        totalPrice 
    } = req.body;

    // Kiểm tra tính hợp lệ cơ bản của dữ liệu
    if (!shippingInfo || orderItems.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Thông tin giao hàng hoặc giỏ hàng không hợp lệ.",
        });
    }

    try {
        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            // Các trường mặc định: orderStatus: 'Processing', createdAt
        });

        res.status(201).json({
            success: true,
            message: "Đặt hàng thành công!",
            order,
        });

    } catch (error) {
        // Xử lý lỗi cache khi tạo đơn hàng
        if (error.message.includes('bufferCommands')) {
            return handleCacheError(res, 'Không thể tạo đơn hàng do cache DB.');
        }
        
        console.error("LỖI TẠO ĐƠN HÀNG:", error.message);
        res.status(500).json({
            success: false,
            message: "Lỗi Server khi tạo đơn hàng.",
        });
    }
};

// -----------------------------------------------------
// 2. LẤY TẤT CẢ ĐƠN HÀNG (GET - Dùng cho Admin Dashboard)
// -----------------------------------------------------

exports.getAllOrders = async (req, res, next) => {
    try {
        // Lấy tất cả đơn hàng
        const orders = await Order.find();
        
        // Tính tổng doanh thu (Giả định)
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

        res.status(200).json({
            success: true,
            totalOrders: orders.length,
            totalRevenue,
            orders,
        });
    } catch (error) {
        // Xử lý lỗi cache
        if (error.message.includes('bufferCommands')) {
            return handleCacheError(res, 'Admin API gặp lỗi cache khi lấy đơn hàng.');
        }

        console.error("LỖI LẤY ĐƠN HÀNG ADMIN:", error.message);
        res.status(500).json({
            success: false,
            message: "Lỗi Server khi lấy danh sách đơn hàng.",
        });
    }
};

// Lưu ý: Chúng ta sẽ thêm hàm xử lý lỗi handleCacheError vào productController.js nếu chưa có
// và import nó vào đây (như đã khai báo ở đầu file).
// file: server/controllers/orderController.js (Thêm vào cuối file)

// -----------------------------------------------------
// 3. LẤY CHI TIẾT ĐƠN HÀNG (GET - Dùng cho Admin và Khách hàng)
// -----------------------------------------------------

exports.getSingleOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id; // Lấy ID đơn hàng từ URL params
        
        // Tìm đơn hàng theo ID. 
        // Trong môi trường thực tế, chúng ta sẽ dùng .populate() để lấy thông tin người dùng
        const order = await Order.findById(orderId); 

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy đơn hàng này."
            });
        }
        
        res.status(200).json({
            success: true,
            order,
        });

    } catch (error) {
        // Xử lý lỗi cache hoặc lỗi định dạng ID
        if (error.message.includes('bufferCommands') || error instanceof mongoose.Error.CastError) {
             return handleCacheError(res, 'Lỗi Server hoặc ID đơn hàng không hợp lệ.');
        }

        console.error("LỖI LẤY CHI TIẾT ĐƠN HÀNG:", error.message);
        res.status(500).json({
            success: false,
            message: "Lỗi Server khi lấy chi tiết đơn hàng.",
        });
    }
};

// Lưu ý: Đảm bảo bạn đã import mongoose ở đầu file orderController.js