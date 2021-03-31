import React from 'react'
import { useParams } from 'react-router-dom'
import Mission from './Mission/Mission'
import Discount from './Discount/Discount'
import Shop from './Shop/Shop'
import Cart from './Cart/Cart'
import Contact from './Contact/Contact'
import './page.scss'

const Page = () => {

    const { page } = useParams()

    return (
        <div className='desktop_page_container'>
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