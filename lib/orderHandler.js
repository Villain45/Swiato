//handling the orders and when place order is clicked on modal dialog
import React from 'react'

const createOrder = async({name,phone,address,total,PaymentMethod}) => {
    const res = await fetch('/api/order',{
        method: "POST",
        body: JSON.stringify({
            name: name,
            phone: parseInt(phone),
            address: address,
            total: parseFloat(total),
            method: PaymentMethod,
            state: 1 //not necessary since it is getting passed as one from api/order
        })
    })

    const id = await res.json() //returning a random id
    return id; //this is returned to orderModel
}

export default createOrder