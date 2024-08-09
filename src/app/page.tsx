'use client'

import React from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import Image from "next/image";
import Hero from "@/components/Hero/Hero";
import products from "../products.json";
import { handleImageContextMenu } from '../helper/functions'

interface Product {
  id: number;
  title: string;
  price: number;
  shipping: string;
  image: string;
  sizes: string[];
}

const Home: React.FC = () => {
  return (
    <>
      <div
        className={styles.imageContainer}
        onContextMenu={handleImageContextMenu}
      >
        <Image
          src="/images/draw.svg"
          width={549}
          height={408}
          alt="background decoration"
          onContextMenu={handleImageContextMenu}
        />
      </div>
      <div className={styles.main}>
        <Hero />
        <div className={styles.cardContainer}>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
