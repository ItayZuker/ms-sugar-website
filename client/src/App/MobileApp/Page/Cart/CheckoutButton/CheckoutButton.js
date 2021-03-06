import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './checkout_button.scss'

const CheckoutButton = ( props ) => {

    const { checkout, appState } = useContext( ShopContext )

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
        <div className={ 'checkout_button_container ' + ( checkout.lineItems.length > 0 ? 'active ' : '' )}>
            <button
                onClick={ goToCheckout }
                target='_blank'>
                    { appState.language === 'english' ? 'Checkout' : 'לשלב הבא' }
                </button>
        </div>
    )
}

export default CheckoutButton