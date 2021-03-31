import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import CheckoutButton from './CheckoutButton/CheckoutButton'
import CheckoutItem from './CheckOutItem/CheckOutItem'
import LoadingCart from './LoadingCart/LoadingCart'
import './cart.scss'

const Cart = () => {

    const { checkout, currencyData, setAppState, getTotalPriceAmount } = useContext( ShopContext )
    const [ totalPrice, setTotalPrice ] = useState('')
    const [ notificationOn, setNotificationOn ] = useState( false )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setAppState( prevState => {
            return { ...prevState, page: 'cart' }
        })
    }, [])

    useEffect(() => {
        console.log('123')
        const fetchData = async () => {
            const totalPrice = await getTotalPriceAmount()
            setTotalPrice( totalPrice )
        }
        fetchData()
    }, [ currencyData, checkout ])

    if ( !checkout.lineItems ) return <LoadingCart />

    return (
        <div className='cart_container'>
            <div className={ 'empty_cart ' + ( checkout.lineItems.length > 0 ? 'hide ' : '' ) }>
                <h3 className={ notificationOn ? 'notificationOn' : '' }>No items</h3>
            </div>
            <div className='items_container'>
                { checkout.lineItems.map( item => {
                    return <CheckoutItem 
                    key={ item.id }
                    item={ item }/>
                } ) }
            </div>
            <div className='subtotal_container'>
                <h3 className={ checkout.lineItems.length > 0 ? '' : 'no_items ' }>Subtotal: { currencyData.currentCurrencySymbole } { totalPrice }</h3>
            </div>
            <CheckoutButton setNotificationOn={ setNotificationOn }/>
            <h3 className={ checkout.lineItems.length > 0 ? '' : 'no_items ' }>Apply coupon next step</h3>
        </div>
    )
}

export default Cart