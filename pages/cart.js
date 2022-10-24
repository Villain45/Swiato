import Image from 'next/image'
import React, { useState } from 'react'
import {useStore}  from '../dataStore/store'
import Layout from '../components/Layout'
import {UilTimes,UilShoppingCart} from '@iconscout/react-unicons'
import { urlFor } from '../lib/client'
import css from '../styles/cart.module.css'
import toast, { Toaster } from 'react-hot-toast'
import OrderModal from '../components/OrderModal'
import { useRouter } from 'next/router'
import { Helmet } from 'react-helmet'
const Cart = () => {

    const cartData = useStore((state) => state.cart); //all foodItems in cart

    const removeItem = useStore((state) => state.removeFoodItems) // removing items from cart
    const [PaymentMethod, setPaymentMethod] = useState(null)
    const [Order, setOrder] = useState(
        typeof window !== 'undefined'  && localStorage.getItem('orderId')
    )


    const router = useRouter();
    const handleRemove = (i) => {
        removeItem(i)
        toast.success("Item has been removed")
    }

    const total = () => cartData.foodItems.reduce((total, i) => total + i.quantity*i.price, 0);
    
    //pay on cash or Online
    const handleOnDelivery = () => {
        setPaymentMethod(0);
        typeof window !== 'undefined'  && localStorage.setItem('total',total()) //since we are using nextjs server is rendered first,so first window is defined or not
    }

    const handleonOnlinePay = async() => {
        typeof window !== 'undefined'  && localStorage.setItem('total',total()) 
        setPaymentMethod(1);
        const response = await fetch('/api/stripe',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartData.foodItems)  //sending to stripe method
        })

        if(response.status === 500 ) return;

        const data = await response.json()
        toast.loading("Redirecting... Please Wait");
        router.push(data.url)
    }

    const cantPlaceOrder = () => {
        if(Order)
            toast.error("Order cannot be placed, Since recent order is not yet completed")
        else if(cartData.foodItems.length === 0)
            toast.error("Cart is empty")
    }

  return (
    <Layout>
        <Helmet><title>Swiato | Cart</title></Helmet>
        {cartData.foodItems.length === 0 ? (
            <div className={css.emptyCart}>
                <UilShoppingCart width={200} height={200}/>
                <span>Cart is empty!!</span>
            </div>
        ) : (
            <div className={css.container}>
            {/* Details */}
            <div className={css.details}>
                
                <table className={css.table}>
                    <thead>
                        <th>FoodItem</th>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </thead>
                    <tbody className={css.tbody}>
                        {cartData.foodItems.length>0 && 
                            cartData.foodItems.map((eachItem,i) => {
                                console.log(eachItem);
                                const src = urlFor(eachItem.image).url()
                                return (
                                    <tr key={i}>
                                        <td>
                                            <Image 
                                                loader={()=>src} 
                                                src={src} 
                                                alt=''
                                                className={css.img}
                                                objectFit='cover'
                                                width={85}
                                                height={85}
                                            />
                                        </td>
                                        <td>
                                            {eachItem.name}
                                        </td>
                                            <td>
                                                {eachItem.size===0 && eachItem.price === 99? 
                                                "Small":
                                                eachItem.size===1 && eachItem.hasSize===1?
                                                "Medium":
                                                eachItem.size===2 && eachItem.hasSize===2?
                                                "Large" :
                                                "-"
                                                }
                                            </td>
                                        <td>
                                            {eachItem.price}
                                        </td>
                                        <td>
                                            {eachItem.quantity}
                                        </td>
                                        <td>
                                            {eachItem.price * eachItem.quantity}
                                        </td>
                                        <td onClick={()=>handleRemove(i)}>
                                            <UilTimes style={{color:'var(--themeRed)',cursor:'pointer'}}  />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <Toaster toastOptions={{duration:4000}}/>              
            {/* Total Summary */}
            <div className={css.cart}>
                <span>Cart</span>
                <div className={css.cartDetails}>
                    <div>
                        <span>Items</span>
                        <span>{cartData.foodItems.length}</span>
                    </div>

                    <div>
                        <span>Total</span>
                        <span style={{fontFamily:'Arial', color:"var(--themeRed)"}} > &#x20B9;<span style={{color:"var(--themeBlack)",paddingLeft:"3px"}}>{total()}</span></span>
                    </div>
                </div>

                {!Order && cartData.foodItems.length > 0 ? (
                    <div className={css.buttons}>
                        <button className="btn" onClick={handleOnDelivery}>Pay On Delivery</button>
                        <button className="btn" onClick={handleonOnlinePay}>Pay Online</button>
                    </div>
                ): (
                    <div className={css.buttons}>
                        <button className="btn" onClick={cantPlaceOrder}>Pay On Delivery</button>
                        <button className="btn" onClick={cantPlaceOrder}>Pay Online</button>
                    </div>
                )}
            </div>
        </div>
        )}

        <OrderModal
            opened={PaymentMethod===0}
            setOpened={setPaymentMethod}
            PaymentMethod={PaymentMethod}
        />
    </Layout>
  )
}

export default Cart