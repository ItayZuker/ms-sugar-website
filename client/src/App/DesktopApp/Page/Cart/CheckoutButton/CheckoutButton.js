import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './checkout_button.scss'

const CheckoutButton = ( props ) => {

    const { checkout } = useContext( ShopContext )

    const goToCheckout = (e) => {
        e.preventDefault()
        if( checkout.lineItems.length > 0 ) {
            window.location = checkout.webUrl;
        } else {
            setNotification()
        }
    }

    const setNotification = () => {
        props.setNotificationOn( true )
        setTimeout(() => {
            props.setNotificationOn( false )
        }, 500)
    }

    return (
        <div className='desktop_checkout_button_container'>
            <button
                className={ checkout.lineItems.length > 0 ? 'active ' : '' }
                onClick={ goToCheckout }
                target='_blank'>Checkout</button>
        </div>
    )
}

export default CheckoutButton