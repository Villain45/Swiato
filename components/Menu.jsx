import css from '../styles/menu.module.css'
import React from 'react'
import {urlFor} from '../lib/client'
import Image from 'next/image'
import Link from 'next/link'

const Menu = ({foodItems}) => {
    var count = 0; //for some items only to be displayed on home
    return (
    <div className={css.container}>
      <div className={css.heading}>
        <span>Our Specials</span>
        <span>Frequently ordered by our customers</span>
      </div>

      {/* Items */}
        <div className={css.menu}>
        {foodItems.map((eachItem,id) => { 
          count=count+1;
          {/* getting source for all images */}
          const src = urlFor(eachItem.image).url()
          if(count<=5) {
            return (
              <div className={css.foodItems} key={id}>

                {/* For travelling from one to other page */}
                  <Link href={`./foods/${eachItem.slug.current}`}> 
                    <div className={css.imageWrapper}>
                      <Image className={css.img} loader={()=>src} src={src} alt='' objectFit='cover' layout='fill'/>
                    </div>
                  </Link>
                  <span>{eachItem.name}</span>
                <span style={{fontFamily:'Arial', color:"var(--themeRed)"}} > &#x20B9;<span style={{color:"var(--themeBlack)",paddingLeft:"2px"}}>{eachItem.price[0]}</span></span>
              </div>
            )
          }
          })}
        </div>
      
      </div>
    )
  }


export default Menu