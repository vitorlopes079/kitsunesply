"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useRef,
} from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface CartContextType {
  isCartVisible: boolean;
  toggleCartVisibility: () => void;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  removeFromCart: (id: number, size: string) => void;
  calculateTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [isCartVisible, setCartVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const lastAddedItemRef = useRef<{ id: number; size: string } | null>(null);

  const toggleCartVisibility = useCallback(() => {
    setCartVisible((prev) => !prev);
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    console.log("addToCart called");
    console.log("Adding to cart:", item);

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );

      console.log("Existing item index:", existingItemIndex);
      console.log(
        "Cart items before update:",
        JSON.stringify(prevItems, null, 2)
      );

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 0.5;

        console.log("Updated items:", JSON.stringify(updatedItems, null, 2));
        lastAddedItemRef.current = { id: item.id, size: item.size };
        return updatedItems;
      } else {
        const newItems = [...prevItems, { ...item, quantity: 1 }];
        console.log("New items:", JSON.stringify(newItems, null, 2));
        lastAddedItemRef.current = { id: item.id, size: item.size };
        return newItems;
      }
    });
  }, []);

  const updateQuantity = useCallback(
    (id: number, size: string, quantity: number) => {
      setCartItems((prevItems) => {
        const updatedItems = prevItems
          .map((item) =>
            item.id === id && item.size === size
              ? { ...item, quantity: Math.max(item.quantity + quantity, 0) }
              : item
          )
          .filter((item) => item.quantity > 0);

        console.log(
          "Cart items after quantity update:",
          JSON.stringify(updatedItems, null, 2)
        );
        return updatedItems;
      });
    },
    []
  );

  const removeFromCart = useCallback((id: number, size: string) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => !(item.id === id && item.size === size)
      );

      console.log(
        "Cart items after removal:",
        JSON.stringify(updatedItems, null, 2)
      );
      return updatedItems;
    });
  }, []);

  const calculateTotal = useCallback(() => {
    const total = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    console.log("Total amount:", total);
    return total;
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        isCartVisible,
        toggleCartVisibility,
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
