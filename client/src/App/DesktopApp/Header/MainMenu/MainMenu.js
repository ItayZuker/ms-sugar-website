import React, { useContext, useState } from 'react'
import CurrencyDropdown from './CurrencyDropdown/CurrencyDropdown'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../Context/shopContext'
import './main_menu.scss'

const MainMenu = () => {

    const [ openDropdownCurrency, setOpenDropdownCurrency] = useState( false )
    const { appState, setAppState, itemsInCart, currencyData } = useContext( ShopContext )
    const history = useHistory()

    const selectPage = (page) => { 
        setAppState(prevState => {
            return { ...prevState, page: page }
        })
        history.push(`/${page}`)
    }

    const clickDropdown = () => {
        if ( openDropdownCurrency ) {
            setOpenDropdownCurrency( false )
        } else {
            setOpenDropdownCurrency( true )
        }
    }

    return (
        <div className='main_menu_containet'>
            <div
                className='nav_item'
                onClick={ () => selectPage('mission') }
                >
                <h4
                    className={ appState.page === 'mission' ? 'selected' : '' }
                    >Mission</h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('discount') }
                >
                <h4
                    className={ appState.page ===  'discount' ? 'selected' : '' }
                    >Discount</h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('shop/decks') }
                >
                <h4
                    className={ appState.page === 'shop' ? 'selected' : '' }
                    >Shop <i className="fas fa-store"></i></h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('cart') }
                >
                <h4
                    className={ appState.page === 'cart' ? 'selected' : '' }
                    >Cart ({ itemsInCart })<i className="fas fa-shopping-cart"></i></h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('contact') }
                >
                <h4
                    className={ appState.page === 'contact' ? 'selected' : '' }
                    >Contact</h4>
            </div>
            <div 
                className='nav_item'
                tabIndex={ -1 }
                onClick={ clickDropdown }
                onBlur={ () => setOpenDropdownCurrency( false ) }
                >
                <h4
                    className='currency'
                    >{ currencyData.currentCurrencyCode }{ openDropdownCurrency ? <i className="fas fa-times"></i> : <i className="fas fa-caret-down"></i> }</h4>
                <CurrencyDropdown 
                    openDropdownCurrency={ openDropdownCurrency }
                    setOpenDropdownCurrency={ setOpenDropdownCurrency }/>
            </div>
        </div>
    )
}


export default MainMenu

