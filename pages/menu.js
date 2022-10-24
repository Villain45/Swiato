import React from 'react'
import Layout from '../components/Layout'
import Helmet from 'react-helmet'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '../lib/client'
import css from '../styles/wholemenu.module.css'
const menu = ({foodItems}) => {
  return (
    <Layout>
        <Helmet><title>Swiato | Menu</title></Helmet>
      <div className={css.container}>
      <div className={css.heading}>
        <span>Our Menu</span>
        <span>Providing a variety of foodItems</span>
      </div>

      {/* Items */}
      <div className={css.menu}>
        {foodItems.map((eachItem,id) => {
        {/* getting source for all images */}
          const src = urlFor(eachItem.image).url()
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
        })}
      </div>
    </div>
    </Layout>
  )
}

export default menu

export const getServerSideProps = async () => {
  const query = '*[_type == "food"]';
  const foodItems = await client.fetch(query);
  return {
    props :{
      foodItems
    }
  }
}