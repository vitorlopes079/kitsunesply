"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "../../context/cartContext";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./Cart.module.css";
import { handleImageContextMenu } from "../../helper/functions";

// Ensure the publishable key is available or throw an error
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
    (() => {
      throw new Error("Stripe publishable key is missing");
    })()
);

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

  const handleCheckout = async () => {
    // Log the cart items before processing
    console.log("Cart Items:", cartItems);

    const items = cartItems.map((item) => {
      // Calculate the price in cents and log it
      const priceInCents = Math.round(item.price * 100);
      console.log(
        `Item: ${item.name}, Price in Dollars: ${item.price}, Price in Cents: ${priceInCents}`
      );

      return {
        name: item.name,
        price: priceInCents, // Ensure the price is an integer in cents
        quantity: item.quantity,
      };
    });

    // Log the final items array that will be sent to Stripe
    console.log("Items to be sent to Stripe:", items);

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const session = await res.json();

    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe initialization failed.");
      return;
    }

    if (!session.id) {
      console.error("Session ID not returned");
      return;
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Stripe Checkout error:", error);
    }
  };

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
                  onContextMenu={handleImageContextMenu}
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
                    onClick={() => updateQuantity(item.id, item.size, -1)}
                  >
                    <p className={styles.quantity}>-</p>
                  </div>

                  <div className={styles.quantityDisplay}>
                    <p className={styles.quantity}>{item.quantity}</p>
                  </div>

                  <div
                    className={styles.quantityDisplay}
                    onClick={() => updateQuantity(item.id, item.size, 1)}
                  >
                    <p className={styles.quantity}>+</p>
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
                  onContextMenu={handleImageContextMenu}
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
        {/* <button className={styles.checkoutButton} onClick={handleCheckout}> */}
        <button className={styles.checkoutButton}>
          <span>CHECKOUT</span>
        </button>
      </div>
    </div>
  );
};

export default Cart;
