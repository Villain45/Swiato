import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/Layout'
import OrderModal from '../components/OrderModal'

const success = () => {
  return (
    <Layout>
    <Helmet><title>Order Placed</title></Helmet>
        <OrderModal opened={true} PaymentMethod={1}/>
    </Layout>
  )
}

export default success