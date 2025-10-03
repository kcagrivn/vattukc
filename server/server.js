// file: server/server.js

// 1. Load các thư viện cần thiết
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose'); 
const cookieParser = require('cookie-parser'); // <-- THƯ VIỆN ĐỌC COOKIE

// Khởi tạo ứng dụng Express
const app = express();
// Lấy PORT từ file .env, mặc định là 5000
const PORT = process.env.PORT || 5000; 

// 2. Middlewares (Bộ xử lý trung gian)
app.use(express.json());
app.use(cookieParser()); // <-- KÍCH HOẠT COOKIE-PARSER ĐỂ MIDDLEWARE ĐỌC TOKEN

// 3. Import Routes (Các đường dẫn API)
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes'); 

// 4. Định nghĩa Routes (Sử dụng giải pháp tách route)

// 1. User Routes (Xác thực) <-- TIỀN TỐ ĐỘC LẬP /auth
// Routes: /api/v1/auth/register, /api/v1/auth/login
app.use('/api/v1/auth', userRoutes); 

// 2. Sản phẩm Routes (Products và Admin Products)
app.use('/api/v1', productRoutes); 

// 3. Order Routes (Đơn hàng)
app.use('/api/v1', orderRoutes); 

// API cơ bản để kiểm tra server
app.get('/', (req, res) => {
    res.json({ message: 'Server cho VattuKC đang chạy. Sẵn sàng test API!' });
});

// 5. Khởi động Server và Xử lý Kết nối Database
async function startServer() {
    // Sử dụng chuỗi kết nối Localhost Tạm thời để tránh lỗi mạng
    const MOCK_MONGO_URI = 'mongodb://127.0.0.1:27017/vattukc_mock_db';
    
    try {
        await mongoose.connect(MOCK_MONGO_URI);
        console.log(`Kết nối Database TẠM THỜI thành công!`);
        
    } catch (error) {
        if (error.code === 'ECONNREFUSED' || error.name === 'MongooseServerSelectionError') {
            console.warn(`LƯU Ý: Server không thể kết nối DB cục bộ. Dữ liệu sẽ không được lưu!`);
        } else {
            console.error('LỖI KẾT NỐI DB KHÔNG XÁC ĐỊNH:', error);
        }
    } finally {
        app.listen(PORT, () => {
            console.log(`Server đang lắng nghe tại http://localhost:${PORT}`);
            console.log(`Trạng thái: Sẵn sàng test API Đăng ký/Đăng nhập`);
        });
    }
}

startServer();