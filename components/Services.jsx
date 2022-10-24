import Image from 'next/image'
import React from 'react'
import css from '../styles/services.module.css'
import s1 from '../assets/s1.png'
import s2 from '../assets/s2.png'
import s3 from '../assets/s3.png'
const Services = () => {
  return (
    <>
        <div className={css.heading}>
            <span>Our Services</span>
            <span>Delivery Partner</span>
        </div>

        {/* features */}
        <div className={css.services}>
            <div className={css.feature}>
                <div className={css.imageWrapper}>
                    <Image src={s1} alt="" objectFit='cover' layout='intrinsic'/>
                </div>

                <span>Easy to order</span>
                <span>Few Steps and <span style={{color: 'var(--themeRed)'}}>Food</span> is on your Table</span>
            </div>
            <div className={css.feature}>
                <div className={css.imageWrapper}>
                    <Image src={s2} alt="" objectFit='cover' layout='intrinsic'/>
                </div>

                <span>Safe Delivery</span>
                <span>Our team is <span style={{color: 'var(--themeRed)'}}>Vaccinated</span> and takes care of covid measures</span>
            </div>
            <div className={css.feature}>
                <div className={css.imageWrapper}>
                    <Image src={s3} alt="" objectFit='cover' layout='intrinsic'/>
                </div>

                <span>Super Fast Delivery</span>
                <span>We will deliver your <span style={{color: 'var(--themeRed)'}}>Food</span> in no time</span>
            </div>
        </div>
    </>
  )
}

export default Services