import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../Context/shopContext'
import './header_dropdown.scss'


const MobileMainMenu = () => {

    const { appState, setAppState, itemsInCart } = useContext(ShopContext)
    const history = useHistory()

    const selectPage = (page) => {
        setAppState(prevState => {
            return { ...prevState,
                mainMenu: { open: false }, 
                loading: { active: false },
                page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <div className={'mobile_main_menu_container ' + (appState.mainMenu.open ? '' : 'hide')}>
            <div 
                className='page_item'
                onClick={() => selectPage('mission')}>
                <h3 className={appState.page === 'mission' ? 'selected' : ''}
                    >Mission</h3>
            </div>
            <div 
                className='page_item'
                onClick={() => selectPage('discount')}>
                <h3 className={appState.page === 'discount' ? 'selected' : ''}
                    >Discount</h3>
            </div>
            <div 
                className='page_item'
                onClick={() => selectPage('shop/decks')}>
                <h3 className={appState.page === 'shop' ? 'selected' : ''}
                    >Shop <i className="fas fa-store"></i></h3>
            </div>
            <div 
                className='page_item'
                onClick={() => selectPage('cart')}>
                <h3 className={appState.page === 'cart' ? 'selected' : ''}
                    >Cart ({ itemsInCart })<i className="fas fa-shopping-cart"></i></h3>
            </div>
            <div 
                className='page_item'
                onClick={() => selectPage('contact')}>
                <h3 className={appState.page === 'contact' ? 'selected' : ''}
                    >Contact</h3>
            </div>
        </div>
    )
}

export default MobileMainMenu