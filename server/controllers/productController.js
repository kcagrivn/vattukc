// file: server/controllers/productController.js

const Product = require('../models/ProductModel'); 
const mongoose = require('mongoose');
// Import hàm xử lý lỗi cache từ Utils
const { handleCacheError } = require('../utils/errorHandler'); 

// Class tiện ích để xây dựng truy vấn tìm kiếm/lọc
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query; 
        this.queryStr = queryStr; 
    }

    // 1. Tìm kiếm theo từ khóa (dùng cho thanh search)
    search() {
        const keyword = this.queryStr.keyword 
            ? {
                $or: [
                    { name: { $regex: this.queryStr.keyword, $options: 'i' } },
                    { description: { $regex: this.queryStr.keyword, $options: 'i' } },
                ]
            } 
            : {};
        
        this.query = this.query.find({ ...keyword });
        return this;
    }

    // 2. Lọc theo Danh mục, Giá, Thương hiệu (dùng cho FilterBar)
    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ['keyword', 'limit', 'page', 'sort'];
        removeFields.forEach(el => delete queryCopy[el]);

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
        
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    // 3. Phân trang (Pagination)
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);
        
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }

    // 4. Sắp xếp (Sort)
    sort() {
        if (this.queryStr.sort) {
            const sortBy = this.queryStr.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }
}

// -----------------------------------------------------
// 1. TẠO SẢN PHẨM (POST)
// -----------------------------------------------------

exports.createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body); 
        
        res.status(201).json({
            success: true,
            message: "Sản phẩm được tạo thành công (Dữ liệu không được lưu vĩnh viễn)", 
            product 
        });
    } catch (error) {
        if (error.message.includes('bufferCommands')) {
             return handleCacheError(res, 'Không thể tạo sản phẩm do cache DB.');
        }
        
        console.error("LỖI DỮ LIỆU SẢN PHẨM:", error.message);
        res.status(400).json({ 
            success: false,
            message: 'Dữ liệu sản phẩm không hợp lệ.',
            error: error.message
        });
    }
};

// -----------------------------------------------------
// 2. LẤY TẤT CẢ SẢN PHẨM (GET - Cho Khách hàng, có Phân trang/Lọc)
// -----------------------------------------------------

exports.getAllProducts = async (req, res, next) => {
    try {
        const resultPerPage = 12; 

        const totalProductsCount = await Product.countDocuments(); 

        const features = new APIFeatures(Product.find(), req.query)
            .search() 
            .filter()
            .sort(); 

        const productsCountAfterFilter = await features.query.clone().countDocuments();

        features.pagination(resultPerPage);

        const products = await features.query;
        
        res.status(200).json({
            success: true,
            totalProductsCount,
            productsCountAfterFilter,
            resultPerPage,
            products 
        });
    } catch (error) {
        if (error.message.includes('bufferCommands')) {
            return handleCacheError(res, 'Không thể lấy sản phẩm do cache DB.');
        }
        
        console.error("LỖI LẤY SẢN PHẨM:", error.message);
        res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách sản phẩm.',
            error: error.message
        });
    }
};

// -----------------------------------------------------
// 3. LẤY TẤT CẢ SẢN PHẨM (GET - Cho Admin, không Phân trang)
// -----------------------------------------------------

exports.getAdminProducts = async (req, res, next) => {
    try {
        const products = await Product.find(); 
        
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        if (error.message.includes('bufferCommands')) {
            return handleCacheError(res, 'Admin API gặp lỗi cache.');
        }
        
        console.error("LỖI ADMIN PRODUCTS:", error.message);
        res.status(500).json({
            success: false,
            message: 'Không thể lấy danh sách sản phẩm quản trị.',
            error: error.message
        });
    }
};

// 4. CẬP NHẬT SẢN PHẨM (PUT - Dùng cho Admin)
// -----------------------------------------------------
exports.updateProduct = async (req, res, next) => {
    try {
        let product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm này."
            });
        }
        
        // Dùng findByIdAndUpdate để cập nhật sản phẩm
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Trả về tài liệu đã cập nhật
            runValidators: true, // Chạy lại các quy tắc kiểm tra (validator)
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            message: "Cập nhật sản phẩm thành công.",
            product,
        });

    } catch (error) {
        if (error.message.includes('bufferCommands') || error instanceof mongoose.Error.CastError) {
             return handleCacheError(res, 'Lỗi Server hoặc ID sản phẩm không hợp lệ.');
        }
        console.error("LỖI CẬP NHẬT SẢN PHẨM:", error.message);
        res.status(500).json({ success: false, message: "Lỗi Server khi cập nhật." });
    }
};

// -----------------------------------------------------
// 5. XÓA SẢN PHẨM (DELETE - Dùng cho Admin)
// -----------------------------------------------------
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy sản phẩm này."
            });
        }

        // Xóa sản phẩm
        await product.deleteOne(); 

        res.status(200).json({
            success: true,
            message: "Xóa sản phẩm thành công.",
        });
        
    } catch (error) {
        if (error.message.includes('bufferCommands') || error instanceof mongoose.Error.CastError) {
             return handleCacheError(res, 'Lỗi Server hoặc ID sản phẩm không hợp lệ.');
        }
        console.error("LỖI XÓA SẢN PHẨM:", error.message);
        res.status(500).json({ success: false, message: "Lỗi Server khi xóa." });
    }
};