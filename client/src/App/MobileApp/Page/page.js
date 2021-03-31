import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Mission from './Mission/Mission'
import Discount from './Discount/Discount'
import Shop from './Shop/Shop'
import Cart from './Cart/Cart'
import Contact from './Contact/Contact'
import './page.scss'
import { ShopContext } from '../../../Context/shopContext'

const Page = () => {

    const { page } = useParams()
    const { appState } = useContext( ShopContext )

    return (
        <div className={ 'page_container ' + ( appState.productMenu.open ? 'freeze ' : '' ) }>
            { page === undefined ? <Mission /> : null }
            { page === 'mission' ? <Mission /> : null }
            { page === 'discount' ? <Discount /> : null }
            { page === 'shop' ? <Shop /> : null }
            { page === 'cart' ? <Cart /> : null }
            { page === 'contact' ? <Contact /> : null }
        </div>
    )
}

export default Page