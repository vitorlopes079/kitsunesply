import React from "react";
import styles from "./page.module.css";
import ProductCard from "@/components/ProductCard/ProductCard";
import Image from "next/image";
import Hero from "@/components/Hero/Hero";
import products from "../products.json";

interface Product {
  id: number;
  title: string;
  price: string;
  shipping: string;
  image: string;
  sizes: string[];
}

const Home: React.FC = () => {
  return (
    <>
      <div className={styles.imageContainer}>
        <Image
          src="/images/draw.svg"
          width={610}
          height={453}
          alt="background decoration"
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
