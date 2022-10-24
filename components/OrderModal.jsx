import React, { useState } from 'react'
import { Modal, useMantineTheme } from '@mantine/core';
import css from '../styles/orderModal.module.css'
import createOrder from '../lib/orderHandler';
import toast, { Toaster } from 'react-hot-toast';
import { useStore } from '../dataStore/store';
import { useRouter } from 'next/router';
const OrderModal = ({opened,setOpened,PaymentMethod}) => {
  
    const theme = useMantineTheme();
    const [FormData, setFormData] = useState({})
    const router = useRouter();
    
    //getting total from localStorage
    const total = typeof window !== 'undefined'  && localStorage.getItem('total')

    const handleInput = (e) => {
        setFormData({...FormData,[e.target.name]:e.target.value}) //using name in the input fields we storing the data
    }

    const resetCart = useStore((state) => state.resetCart)

    const handleSubmit = async(e) => {
        e.preventDefault();
        const id = await createOrder({...FormData,total,PaymentMethod})
        toast.success("Order has been placed successfully");
        resetCart();
        {
          typeof window !== 'undefined'  && localStorage.setItem('orderId',id)
        }

        router.push(`/order/${id}`) //putting id in the url so that we can fetch it in [id].js
        // setOpened(null)
    }

    return (
    <Modal
      centered 
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} action="" className={css.formContainer}>
        <input onChange={handleInput} type="text" name="name" required placeholder="Name"/>
        <input onChange={handleInput} type="number" name="phone" required placeholder="Phone Number"/>
        <textarea onChange={handleInput} name="address" required placeholder='Address' rows="3"></textarea>

        <span style={{color:"var(--themeBlack)"}}>
        You have to Pay <span style={{fontFamily:'Arial', color:"var(--themeRed)"}} > &#x20B9;<span style={{fontFamily:"Poppins",color:"var(--themeBlack)",paddingLeft:"3px"}}>{total} after receiving the order</span></span>
        </span>

        <button type="submit" className="btn">Order Now</button>
      <Toaster toastOptions={{duration:3000}}/>
      </form>
    </Modal>
  )
}

export default OrderModal