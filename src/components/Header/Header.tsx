"use client";

import React from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/cartContext";
import { handleImageContextMenu } from "../../helper/functions";

const Header = () => {
  const { toggleCartVisibility } = useCart();

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={109}
          height={73}
          className={styles.logo}
          onContextMenu={handleImageContextMenu}
        />
        <h2 className={styles.name}>KITSUNESPLY</h2>
      </div>
      <nav className={styles.links}>
        <a
          href="https://x.com/kitsunesply"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.a}
        >
          <Image
            src="/images/x.svg"
            width={32}
            height={35}
            alt="x logo"
            className={styles.x}
            onContextMenu={handleImageContextMenu}
          />
        </a>
        <Link href="/contact" className={styles.link}>
          CONTACT
        </Link>
        <div className={styles.cartContainer} onClick={toggleCartVisibility}>
          <Image
            src="/images/cart.svg"
            alt="Cart"
            width={32}
            height={32}
            onContextMenu={handleImageContextMenu}
          />
          <span className={styles.cartLink}>CART</span>
        </div>
      </nav>
    </header>
  );
};

export default Header;
