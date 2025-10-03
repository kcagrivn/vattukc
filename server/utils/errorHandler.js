// file: server/utils/errorHandler.js

// Hàm xử lý lỗi cache/DB chung
exports.handleCacheError = (res, message) => {
    console.error(`LỖI CACHE: ${message}`);
    // Trả về 200 OK nhưng với dữ liệu rỗng và cảnh báo
    return res.status(200).json({ 
        success: true,
        count: 0,
        orders: [], // Thay thế products bằng orders/mảng rỗng chung
        message: 'Không thể truy cập DB do lỗi cache. Trả về dữ liệu trống.'
    });
};