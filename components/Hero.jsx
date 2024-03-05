import Image from "next/image";
import css from "../styles/hero.module.css";
import HeroImage from "../assets/Image.png";
import Burger from "../assets/burger.png";
import Pizza from "../assets/pizzzza.png";
import Cake from "../assets/cake.png";
import Link from "next/link";
const Hero = () => {
  return (
    <div className={css.container}>
      {/* left */}
      <div className={css.left}>
        <div className={css.heroText}>
          <span>Order Your Food</span>
          <span>and Get it delivered in</span>
          <span style={{ color: "var(--themeRed)" }}>10 mins</span>
        </div>

        <span className={css.minText}>Healthier, Tasty, Plentiful</span>

        <Link href="/menu">
          <a className={`btn ${css.btn}`}>Order Now</a>
        </Link>
      </div>

      <div className={css.right}>
        <div className={css.imageContainer}>
          <Image src={HeroImage} alt="" layout="intrinsic" />
        </div>

        <div className={css.Pizza}>
          <div>
            <Image src={Pizza} alt="" objectFit="cover" layout="intrinsic" />
          </div>
        </div>

        <div className={css.Cake}>
          <div>
            <Image src={Cake} alt="" objectFit="cover" layout="intrinsic" />
          </div>
        </div>

        <div className={css.Burger}>
          <div>
            <Image src={Burger} alt="" objectFit="cover" layout="intrinsic" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
