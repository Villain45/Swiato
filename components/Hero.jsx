import Image from 'next/image'
import css from '../styles/hero.module.css'
import Cherry from '../assets/Cherry.png'
import HeroImage from '../assets/HeroImage.png'
import Pizza1 from '../assets/p1.jpg'
import {UilPhone,UilRupeeSign} from '@iconscout/react-unicons'
const Hero = () => {
    return (
        <div className={css.container}>
            {/* left */}
            <div className={css.left}>            
                <div className={css.cherryDiv}>
                    <span>Faster than Lightening</span>
                    <Image src={Cherry} alt="" width={40} height={25} />
                </div>

                <div className={css.heroText}>
                    <span>Just Think About Food</span> 
                    <span>And it will be at your </span>
                    <span style={{color:'var(--themeRed)'}}>DoorStep</span>
                </div>

                <span className={css.minText}>
                    Our motto is not to keep you hungry in any situation
                </span>

                <button className={`btn ${css.btn}`}>
                    Get Started
                </button>
            </div>
            
            <div className={css.right}>
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="" layout="intrinsic"/>
                </div>

                <div className={css.contact}>
                    <span>Contact Us</span>
                    <div>
                        <UilPhone color="white"/>
                    </div>
                </div>

                <div className={css.Pizza}>
                    <div >
                        <Image src={Pizza1} alt="" objectFit='cover' layout='intrinsic'/>
                    </div>

                    <div className={css.details}>
                        <span>Italian Pizza</span>
                        <span><UilRupeeSign color="var(--themeRed)" size={15}/>199</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero