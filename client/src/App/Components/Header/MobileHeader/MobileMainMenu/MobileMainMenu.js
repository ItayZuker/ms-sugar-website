import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { ShopContext } from '../../../../../Context/shopContext'
import './mobile_main_menu.scss'

const MobileMainMenu = () => {

    const { appState, setAppState  } = useContext(ShopContext)
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
                onClick={() => selectPage('art')}>
                <h3 className={appState.page === 'art' ? 'selected' : ''}
                    >Art</h3>
            </div>
            <div 
                className='page_item'
                onClick={() => selectPage('shop')}>
                <h3 className={appState.page === 'shop' ? 'selected' : ''}
                    >Shop</h3>
            </div>
            <div 
                className='page_item'
                onClick={() => selectPage('cart')}>
                <h3 className={appState.page === 'cart' ? 'selected' : ''}
                    >Cart</h3>
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