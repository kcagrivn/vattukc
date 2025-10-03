// file: client/src/context/CartContext.tsx

"use client";
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Định nghĩa kiểu dữ liệu cho sản phẩm trong Giỏ hàng
interface CartItem {
  productId: string;
  name: string;
  price: number;
  slug: string;
  quantity: number;
  imageUrl: string;
}

// Định nghĩa kiểu dữ liệu cho trạng thái Giỏ hàng
interface CartState {
  items: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

// Định nghĩa các hành động (Actions) cho useReducer
type CartAction = 
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// Định nghĩa kiểu dữ liệu cho Context
interface CartContextType extends CartState {
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

// -----------------------------------------------------
// 1. Khởi tạo Trạng thái Ban đầu
// -----------------------------------------------------

const initialState: CartState = {
  items: [],
  totalAmount: 0,
  totalQuantity: 0,
};

// -----------------------------------------------------
// 2. Reducer (Logic Xử lý State)
// -----------------------------------------------------

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.productId === newItem.productId);
      let updatedItems;

      if (existingItemIndex > -1) {
        // Sản phẩm đã tồn tại: Cập nhật số lượng
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        // Sản phẩm mới: Thêm vào danh sách
        updatedItems = [...state.items, newItem];
      }
      return updateCartTotals({ ...state, items: updatedItems });
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.productId !== action.payload.productId);
      return updateCartTotals({ ...state, items: updatedItems });
    }
    
    case 'UPDATE_QUANTITY': {
        const { productId, quantity } = action.payload;
        
        // Đảm bảo số lượng hợp lệ
        if (quantity <= 0) {
            return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId } });
        }

        const updatedItems = state.items.map(item =>
            item.productId === productId
                ? { ...item, quantity: quantity }
                : item
        );
        return updateCartTotals({ ...state, items: updatedItems });
    }

    case 'CLEAR_CART':
      return updateCartTotals({ ...state, items: [] });
      
    default:
      return state;
  }
};

// Hàm tính toán lại Tổng tiền và Tổng số lượng
const updateCartTotals = (state: CartState): CartState => {
    const totalAmount = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    
    return { ...state, totalAmount, totalQuantity };
};

// -----------------------------------------------------
// 3. Khởi tạo Context và Provider
// -----------------------------------------------------

const CartContext = createContext<CartContextType | undefined>(undefined);

// Load trạng thái từ Local Storage (để giữ giỏ hàng khi người dùng tải lại trang)
const loadState = (): CartState => {
    if (typeof window !== 'undefined') {
        const serializedState = localStorage.getItem('vattukc_cart');
        if (serializedState) {
            return JSON.parse(serializedState);
        }
    }
    return initialState;
};

// Lưu trạng thái vào Local Storage
const saveState = (state: CartState) => {
    if (typeof window !== 'undefined') {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('vattukc_cart', serializedState);
    }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState, loadState);

  // Lưu trạng thái mỗi khi state thay đổi
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Các hàm API của Context
  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };
  
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const contextValue: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng Giỏ hàng
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};