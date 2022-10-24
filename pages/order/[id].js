import {client} from '../../lib/client'
import Layout from '../../components/Layout'
import css from '../../styles/orderpageID.module.css'
import spinner from '../../assets/spinner.svg'
import onway from '../../assets/onway.png'
import {UilBill,UilRestaurant,UilBox} from '@iconscout/react-unicons'
import Image from 'next/image'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet'

export const getServerSideProps=async({params}) => { //as we used router in ordering which has id in url, so using params we are getting orderId
    const query = `*[_type == "order" && _id == '${params.id}']`
    const order = await client.fetch(query);
    return {
        props :{
            order:order[0] //since it is array of array , only one element so [0]
        }
    }
}

export default function Orders({order}) { //this order is recieved from getServerSideProps
    
    useEffect(()=>{
        if(order.status > 3 ) //if it is delivered then remove the recipt icon in header
        {
            localStorage.clear()
        }
    },[order]);

    return (    
        <Layout>
        <Helmet><title>Order Placed</title></Helmet>
            <div className={css.container}>
                {order.status > 3 ? 
                <span className={css.heading}>
                    Order Completed
                </span>:
                <span className={css.heading}>
                    Order in Process
                </span>}

                <div className={css.orderDetails}>
                    <div>
                        <span>Order Id</span>
                        <span>{order._id}</span>
                    </div>
                    <div>
                        <span>Customer Name</span>
                        <span>{order.name}</span>
                    </div>
                    <div>
                        <span>Phone Number</span>
                        <span>{order.phone}</span>
                    </div>
                    <div>
                        <span>Payment Method</span>
                        <span>
                            {
                                order.method === 0 ?
                                "Cash on Delivery" :
                                "Online Mode"
                            }
                        </span>
                    </div>
                    <div>
                        <span>Total Amount</span>
                        <span style={{fontFamily:'Arial', color:"var(--themeRed)"}} > &#x20B9;<span style={{fontFamily:'Poppins',color:"var(--themeBlack)",paddingLeft:"3px"}}>{order.total}</span></span>
                    </div>
                </div>

                <div className={css.statusContainer}>
                    <div className={css.status}>
                        <UilBill width={50} height={50}/>
                        <span>Payment</span>
                        {order.method === 0 ? 
                            <span className={css.pending}>On Delivery</span> :
                            <span className={css.completed}>Completed</span> 
                        }
                    </div>


                    <div className={css.status}>
                        <UilRestaurant width={50} height={50}/>
                        <span>Cooking</span>
                        {order.status === 1 && 
                        <div className={css.spinner}>
                            <Image src={spinner} alt=""/>
                        </div>}

                        {order.status > 1 && <span className={css.completed}>Completed</span>}
                    </div>

                    <div className={css.status}>
                        <Image src={onway} alt="" width={50} height={50}/>
                        <span>On the way</span>
                        {order.status === 2 && 
                        <div className={css.spinner}>
                            <Image src={spinner} alt=""/>
                        </div>}

                        {order.status > 2 && <span className={css.completed}>Completed</span>}
                    </div>

                    <div className={css.status}>
                        <UilBox width={50} height={50}/>
                        <span>Delivered</span>
                        {order.status === 3 && 
                        <div className={css.spinner}>
                            <Image src={spinner} alt=""/>
                        </div>}
                        {order.status > 3 && <span className={css.completed}>Completed</span>}
                    </div>
                </div>

            </div>
        </Layout>
    )
}