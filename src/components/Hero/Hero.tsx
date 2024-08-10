"use client";

import React from "react";
import styles from "./Hero.module.css";
import Image from "next/image";
import { handleImageContextMenu } from "../../helper/functions";

const Hero = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.featured}>FEATURED</h4>
      <div className={styles.imagesContainer}>
        <div className={styles.imageContainer}>
          <Image
            src="/images/hero.png"
            alt="hero logo"
            fill
            className={styles.heroLogo}
            onContextMenu={handleImageContextMenu}
          />
        </div>
        <div className={styles.imageContainer2}>
          <Image
            src="/images/rekko.svg"
            alt="hero image"
            fill
            className={styles.heroImage}
            onContextMenu={handleImageContextMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
