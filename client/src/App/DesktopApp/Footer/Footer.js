import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../Context/shopContext'
import './footer.scss'

const Footer = () => {

    const { appState, setAppState, itemsInCart } = useContext( ShopContext )
    const history = useHistory()

    const selectPage = (page) => {
        setAppState(prevState => {
            return { ...prevState, page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <div className='desktop_footer_container'>
            <nav className='navbar_menu'>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('mission')}>
                    <h3
                        className={ appState.page === 'mission' ? 'selected' : '' }
                        >Mission</h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('shop')}>
                    <h3
                        className={ appState.page === 'shop' ? 'selected' : '' }
                        >Shop <i className="fas fa-store"></i></h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('discount')}>
                    <h3
                        className={ appState.page === 'discount' ? 'selected' : '' }
                        >Discount</h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('cart')}>
                    <h3
                        className={ appState.page === 'cart' ? 'selected' : '' }
                        >Cart ({ itemsInCart })<i className="fas fa-shopping-cart"></i></h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('contact')}>
                    <h3
                        className={ appState.page === 'contact' ? 'selected' : '' }
                        >Contact</h3>
                </div>
            </nav>
            <div className='social_container'>
                <div className='social_item'>
                    <i className="fab fa-twitter"></i> Twitter
                </div>
                <div className='social_item'>
                    <i className="fab fa-instagram"></i> Instagram
                </div>
                <div className='social_item copyright'>Copyright <i className="far fa-copyright"></i> 2020 Ms. Sugar Inc. All rights reserved</div>
            </div>
        </div>
    )
}

export default Footer