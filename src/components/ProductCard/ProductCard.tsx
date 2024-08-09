"use client";

import React, { useState, useCallback, useRef } from "react";
import styles from "./ProductCard.module.css";
import Image from "next/image";
import { useCart } from "../../context/cartContext";
import { handleImageContextMenu } from "../../helper/functions";



interface Product {
  id: number;
  title: string;
  price: number;
  shipping: string;
  image: string;
  sizes: string[];
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addToCart, toggleCartVisibility } = useCart();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToCart = useCallback(() => {
    if (selectedSize) {
      console.log("Adding product to cart:", product);
      addToCart({
        id: product.id,
        name: product.title,
        price: Number(product.price),
        quantity: 1,
        image: product.image,
        size: selectedSize,
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        toggleCartVisibility();
      }, 100);
    } else {
      alert("Please select a size.");
    }
  }, [selectedSize, addToCart, toggleCartVisibility, product]);

 

  return (
    <div className={styles.card}>
      <div className={styles.upperContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            alt="Product Image"
            width={500}
            height={500}
            className={styles.image}
            onContextMenu={handleImageContextMenu}
          />
        </div>
        <div className={styles.details}>
          <h2 className={styles.title}>{product.title}</h2>
          <div className={styles.text}>
            <p className={styles.price}>${product.price.toFixed(2)}</p>
            <p className={styles.shipping}>{product.shipping}</p>
          </div>
        </div>
      </div>
      <div className={styles.sizes}>
        {product.sizes.map((size) => (
          <button
            key={size}
            className={`${styles.size} ${
              selectedSize === size ? styles.selected : ""
            }`}
            onClick={() => handleSizeClick(size)}
          >
            <span>{size}</span>
          </button>
        ))}
      </div>
      <button className={styles.addToCart} onClick={handleAddToCart}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.cartIcon}
          onContextMenu={handleImageContextMenu}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12.3692 16H27.0769C27.5077 16 27.9385 15.6923 28 15.2616L30.7077 5.78461C30.8923 5.10769 30.4 4.55384 29.7846 4.55384H7.07692L6.70769 3.13846C6.52308 2.46153 5.90769 2.03076 5.29231 2.03076H2.83077C2.03077 2.03076 1.2923 2.64615 1.23077 3.44615C1.16923 4.30769 1.90769 5.04615 2.70769 5.04615H4.12307L8.8 20.8616C8.98461 21.5385 9.53846 21.9693 10.2154 21.9693H27.5692C28.3692 21.9693 29.1077 21.3539 29.1692 20.5539C29.2308 19.6923 28.4923 18.9539 27.6923 18.9539H12.4308C11.7538 18.9539 11.2 18.5231 11.0154 17.9077V17.8462C10.7077 16.9231 11.4462 16 12.3692 16ZM12.677 29.9077C14.0365 29.9077 15.1385 28.8056 15.1385 27.4462C15.1385 26.0867 14.0365 24.9846 12.677 24.9846C11.3175 24.9846 10.2155 26.0867 10.2155 27.4462C10.2155 28.8056 11.3175 29.9077 12.677 29.9077ZM27.1384 27.4462C27.1384 28.8056 26.0363 29.9077 24.6768 29.9077C23.3174 29.9077 22.2153 28.8056 22.2153 27.4462C22.2153 26.0867 23.3174 24.9846 24.6768 24.9846C26.0363 24.9846 27.1384 26.0867 27.1384 27.4462Z"
          />
        </svg>
        <span>ADD TO CART</span>
      </button>
    </div>
  );
};

export default ProductCard;
