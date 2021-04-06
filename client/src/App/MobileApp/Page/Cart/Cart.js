import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import CheckoutButton from './CheckoutButton/CheckoutButton'
import CheckoutItem from './CheckOutItem/CheckOutItem'
import LoadingCart from './LoadingCart/LoadingCart'
import './cart.scss'

const Cart = () => {

    const { checkout, currencyData, setAppState, getTotalPriceAmount, appState } = useContext( ShopContext )
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
        const fetchData = async () => {
            const totalPrice = await getTotalPriceAmount()
            setTotalPrice( totalPrice )
        }
        fetchData()
    }, [ currencyData, checkout ])

    if ( !checkout.lineItems ) return <LoadingCart />

    return (
        <div className={ 'cart_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
            <div className={ 'empty_cart ' + ( checkout.lineItems.length > 0 ? 'hide ' : '' ) }>
                <h3 className={ notificationOn ? 'notificationOn' : '' }>
                    { appState.language === 'english' ? 'No items' : 'אין מוצרים' }
                </h3>
            </div>
            <div className='items_container'>
                { checkout.lineItems.map( item => {
                    return <CheckoutItem 
                    key={ item.id }
                    item={ item }/>
                } ) }
            </div>
            <div className={ 'subtotal_container ' + ( appState.language === 'hebrew ') }>
                <h3 className={ checkout.lineItems.length > 0 ? '' : 'no_items ' }>
                    { appState.language === 'english' ? currencyData.currentCurrencySymbole + totalPrice : null } 
                    { appState.language === 'english' ? ' :' : '' }               
                    { appState.language === 'english' ? 'Subtotal' : 'סיכום ביניים' }
                    { appState.language === 'english' ? '' : ': ' }
                    { appState.language === 'english' ? null : currencyData.currentCurrencySymbole + totalPrice }
                </h3>
            </div>
            <CheckoutButton setNotificationOn={ setNotificationOn }/>
            <h3 className={ checkout.lineItems.length > 0 ? '' : 'no_items ' }>
                { appState.language === 'english' ? 'Apply coupon next step' : 'הוסף קופון בשלב הבא' }
            </h3>
        </div>
    )
}

export default Cart