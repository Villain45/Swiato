import css from '../../styles/eachFoodSlug.module.css'
import Image from 'next/image';
import Layout from '../../components/Layout'
import { client, urlFor } from "../../lib/client";
import Minus from '../../assets/minus.png'
import Plus from '../../assets/add.png'
import { useState } from 'react';
import {useStore} from '../../dataStore/store'
import toast,{Toaster} from 'react-hot-toast'
import { Helmet } from 'react-helmet';

export default function Food({foodItems}) {
    const src = urlFor(foodItems.image).url()

    const [Size, setSize] = useState(0)
    const [HasSize, setHasSize] = useState(3)
    const [Quantity, setQuantity] = useState(1)

    const addItems = useStore((state) => state.addFoodItems)
    const addToCart = () =>{
        addItems({...foodItems,price:foodItems.price[Size],quantity:Quantity,size:Size,hasSize:HasSize})
        toast.success("Added to cart successfully",{
            style:{
                fontSize:'1rem',
            }
        });
    }
    return (
        <Layout>
        <Helmet><title>Swiato | Menu</title></Helmet>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image className={css.img} loader={()=>src} src={src} alt="" layout='fill' unoptimized/>
                </div>

                <div className={css.right}>
                    <span>{foodItems.name}</span>
                    <span>{foodItems.details}</span>

                    <span style={{fontFamily:'Arial', color:"var(--themeRed)"}} > &#x20B9;<span style={{color:"var(--themeBlack)",paddingLeft:"3px"}}>{foodItems.price[Size]}</span></span>
                    
                    {foodItems.price.length===3 ? 
                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.sizeVariants}>
                            <div onClick={()=> {setSize(0);setHasSize(0)}} className={Size === 0 ? css.selected : ""}>Small</div>
                            <div onClick={()=> {setSize(1);setHasSize(1)}} className={Size === 1 ? css.selected : ""}>Medium</div>
                            <div onClick={()=> {setSize(2);setHasSize(2)}} className={Size === 2 ? css.selected : ""}>Large</div>
                        </div>
                    </div>
                    :
                    ""
                    }

                    <div className={css.quantity}>
                        <span>Quantity</span>

                        <div className={css.counter}>
                            <Image src={Minus} 
                            height={20}
                            width={20}
                            alt=""
                            objectFit="contain"
                            className={css.img1}
                            onClick={()=> Quantity>1 ? setQuantity(Quantity-1) : ""}
                            />

                            <span>{Quantity}</span>

                            <Image src={Plus} 
                            height={20}
                            width={20}
                            alt=""
                            objectFit="contain"
                            className={css.img1}
                            onClick={()=> setQuantity(Quantity+1)}
                            />
                        </div>
                    </div>
                    {/* Button */}
                    <div className={`btn ${css.btn}`} onClick={addToCart}>
                        Add to Cart
                    </div>
                    <Toaster toastOptions={{duration:3000}}/>
                </div>
            </div>
        </Layout>
    )
}



export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="food" && defined(slug.current)][].slug.current` //query which says select type food and also those whose slug is defined and slice is done using[] in this query
    );

    return {
        //provides a path for each slug
        paths:paths.map((slug) => ({params:{slug}})),
        fallback:"blocking"
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params; //if slug is not there it will defined as null
    const foodItems = await client.fetch(
        `*[_type == "food" && slug.current=='${slug}'][0]` //no need to explain
    );
    return {
        props : {
            foodItems,
        }
    }
}