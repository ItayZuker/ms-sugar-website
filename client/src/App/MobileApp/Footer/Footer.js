import React, { useContext } from 'react'
import { ShopContext } from '../../../Context/shopContext'
import MissionFooter from './MissionFooter/MissionFooter'
import DiscountFooter from './DiscountFooter/DiscountFooter'
import ShopFooter from './ShopFooter/ShopFooter'
import CartFooter from './CartFooter/CartFooter'
import ContactFooter from './ContactFooter/ContactFooter'
import './footer.scss'

const Footer = () => {

    const { appState } = useContext( ShopContext )

    const setFooter = () => {
        switch ( appState.page ) {
            case 'mission':
                return <MissionFooter />
            case 'discount':
                return <DiscountFooter />
            case 'shop':
                return <ShopFooter />
            case 'cart':
                return <CartFooter />
            case 'contact':
                return <ContactFooter />
            default: return
        }
    }

    return (
        <div className='footer_container'>
            { setFooter() }
        </div>
    )
}

export default Footer