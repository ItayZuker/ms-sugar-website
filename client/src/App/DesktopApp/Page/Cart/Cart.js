import React, { useContext, useEffect, useState } from 'react'
import CheckoutItem from './CheckoutItem/CheckoutItem'
import CheckoutButton from './CheckoutButton/CheckoutButton'
import { ShopContext } from '../../../../Context/shopContext'
import './cart.scss'

const Cart = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const [ totalPrice, setTotalPrice ] = useState('')
    const [ notificationOn, setNotificationOn ] = useState( false )
    const { setAppState, checkout, currencyData, getTotalPriceAmount, appState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setLoadComponent( true )
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

    return (
        <div className={ 'desktop_cart_container ' + ( loadComponent ? 'load_component ' : '' ) + ( appState.language === 'english' ? '' : 'hebrew ' )}>
            <div className={ 'items_container ' + ( checkout.lineItems.length > 0 ? 'active ' : '' ) }>
                <div className={ 'empty_cart ' + ( checkout.lineItems.length > 0 ? 'hide ' : '' ) }>
                    <h3 className={ notificationOn ? 'notificationOn' : '' }>{ appState.language === 'english' ? 'No items' : 'אין מוצרים' }</h3>
                </div>
                { checkout.lineItems.map( item => {
                        return <CheckoutItem 
                        key={ item.id }
                        item={ item }/>
                    } ) }
            </div>
            <div className='checkout_section'>
                <p className={ checkout.lineItems.length > 0 ? 'active ' : '' }>
                    { appState.language === 'english' ? 'Free shipping on orders over 300 INS.' : 'המשלוח בישראל חינם בהזמנה מעל 300 שקל' }</p>
                <h3 className={ 'subtotal ' + ( checkout.lineItems.length > 0 ? 'active ' : '' ) }>
                    { appState.language === 'english' ? 'Subtotal:' : 'סיכום ביניים:' } { currencyData.currentCurrencySymbole } { totalPrice }</h3>
                <CheckoutButton setNotificationOn={ setNotificationOn } />
                <h3 className={ checkout.lineItems.length > 0 ? 'active ' : '' }>
                    { appState.language === 'english' ? 'Apply coupon next step' : 'שימוש בקופון בשלב הבא' }</h3>
            </div>
        </div>
    )
}

export default Cart