import React from 'react'
import styles from "./Hero.module.css"
import Image from 'next/image';

const Hero = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.featured}>FEATURED</h4>
      <div className={styles.imagesContainer}>
        <Image src="/images/hero.svg" width={683} height={205} alt="hero logo" className={styles.heroLogo}/>
        <Image src="/images/rekko.svg" width={182} height={182} alt="hero image" className={styles.heroImage}/>
      </div>
    </div>
  );
}

export default Hero
