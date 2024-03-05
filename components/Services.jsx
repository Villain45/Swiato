import Image from "next/image";
import React from "react";
import css from "../styles/services.module.css";
import Healthyfood from "../assets/healthyfood.png";
import Time from "../assets/time.png";
import Support from "../assets/support.png";
const Services = () => {
  return (
    <>
      <div className={css.heading}>
        <span>Our Services</span>
      </div>

      {/* features */}
      <div className={css.services}>
        <div className={css.feature}>
          <div className={css.imageWrapper}>
            <Image
              src={Healthyfood}
              alt=""
              objectFit="contain"
              layout="intrinsic"
            />
          </div>

          <span>Healthy Food</span>
          <span>
            Rich with{" "}
            <span style={{ color: "var(--themeRed)" }}>
              Minerals and Nutrients
            </span>{" "}
            made with <span style={{ color: "var(--themeRed)" }}>Organic </span>
            Vegetables and fruits
          </span>
        </div>
        <div className={css.feature}>
          <div className={css.imageWrapper}>
            <Image src={Time} alt="" objectFit="cover" layout="intrinsic" />
          </div>

          <span>On Time Delivery</span>
          <span>
            Our team ensures{" "}
            <span style={{ color: "var(--themeRed)" }}>On Time Delivery</span>{" "}
            and takes care of covid measures
          </span>
        </div>
        <div className={css.feature}>
          <div className={css.imageWrapper}>
            <Image src={Support} alt="" objectFit="cover" layout="intrinsic" />
          </div>

          <span>Customer Support</span>
          <span>
            We provide{" "}
            <span style={{ color: "var(--themeRed)" }}>24*7 Assistance </span>
            for smooth customer experience
          </span>
        </div>
      </div>
    </>
  );
};

export default Services;
