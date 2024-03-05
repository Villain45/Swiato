import css from '../styles/header.module.css'
import Image from 'next/image'
import Logo from '../assets/Logo.png'
import {UilShoppingBag,UilReceipt} from '@iconscout/react-unicons'
import { useStore } from '../dataStore/store'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const Header = () => {
    const itemSize = useStore((state) => state.cart.foodItems.length)

    const [Order, setOrder] = useState("")

    useEffect(()=>{
        setOrder(localStorage.getItem("orderId"))
    },[])

    return (
        <div className={css.header}>
            {/* logo side */}
            <div className={css.logo}>
                <span>Sw<span style={{color: 'var(--themeRed)'}}>ia</span>to</span>
            </div> 

            {/* menu list */}
            <ul className={css.menu}>
                <li><Link href="../">Home</Link></li> 
                <li><Link href="/menu">Menu</Link></li>
                <li>Contact</li>
            </ul>

            <div className={css.rightSide}>
            <Link href="/cart">
                <div className={css.cart}>
                    <UilShoppingBag size={35} color="#2E2E2E"/>
                    <div className={css.badge}>{itemSize}</div>
                </div>
            </Link>

            {Order && (
                <Link href={`/order/${Order}`}>
                    <div className={css.cart}>
                        <UilReceipt size={35} color="#2E2E2E"/>
                        {Order != "" && <div className={css.badge}>1</div>}
                    </div>
                </Link>
            )}
            </div>
        </div>
    )
}

export default Header;
