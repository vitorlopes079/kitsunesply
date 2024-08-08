"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../../context/cartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const {
    isCartVisible,
    toggleCartVisibility,
    cartItems,
    updateQuantity,
    removeFromCart,
    calculateTotal,
  } = useCart();

  if (!isCartVisible) return null;

  return (
    <div className={styles.cartOverlay} onClick={toggleCartVisibility}>
      <div className={styles.cart} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>CART</h2>
        {cartItems.map((item) => (
          <div className={styles.selectedItem} key={`${item.id}-${item.size}`}>
            <div className={styles.cartItem}>
              <div className={styles.itemImage}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>
                  {item.name} (Size: {item.size})
                </p>
                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className={styles.itemActions}>
              <div className={styles.quantityContainer}>
                <p className={styles.quantityLabel}>QUANTITY</p>
                <div className={styles.quantityController}>
                  <div
                    className={styles.quantityDisplay}
                    onClick={() => updateQuantity(item.id, item.size, 1)}
                  >
                    <p className={styles.quantity}>+</p>
                  </div>
                  <div className={styles.quantityDisplay}>
                    <p className={styles.quantity}>{item.quantity}</p>
                  </div>
                  <div
                    className={styles.quantityDisplay}
                    onClick={() => updateQuantity(item.id, item.size, -1)}
                  >
                    <p className={styles.quantity}>-</p>
                  </div>
                </div>
              </div>
              <div
                className={styles.deleteButton}
                onClick={() => removeFromCart(item.id, item.size)}
              >
                <Image
                  src="/images/trash.svg"
                  width={22}
                  height={20}
                  alt="trash button"
                />
              </div>
            </div>
          </div>
        ))}
        <div className={styles.totalSection}>
          <p className={styles.totalLabel}>TOTAL</p>
          <p className={styles.totalAmount}>${calculateTotal().toFixed(2)}</p>
          <p className={styles.shippingInfo}>
            SHIPPING WILL BE CALCULATED AT CHECKOUT
          </p>
        </div>
        <button className={styles.checkoutButton}>
          <span>CHECKOUT</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
