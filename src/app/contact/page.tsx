import React from "react";
import styles from "./page.module.css";
import Link from "next/link";

const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={styles.line}>X - @kitsunesply</p>
        <p className={styles.line}>Discord - dyrexlol</p>
        <p className={styles.line}>kitsunesply@gmail.com</p>
      </div>
      <Link href="/" passHref>
        <button className={styles.button}>BACK</button>
      </Link>
    </div>
  );
};

export default Page;
