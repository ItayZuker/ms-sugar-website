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
        setAppState( prevState => {
            return { ...prevState, page: page }
        })
        history.push( `/${page}` )
    }

    const changeLenguage = ( language ) => {
        setAppState( prevState => {
            return { ...prevState, language: language }
        })
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
                    >{ appState.language === 'english' ? 'Mission' : 'אודות' }</h4>
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('discount') }
                >
                <h4
                    className={ appState.page ===  'discount' ? 'selected' : '' }
                    >{ appState.language === 'english' ? 'Discount' : 'הנחות' }</h4>
            </div>
            <div 
                className={ 'nav_item ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }
                onClick={ () => selectPage('shop/decks') }
                >
                <h4
                        className={ appState.page === 'shop' ? 'selected' : '' }>
                        <i className="fas fa-store"></i>
                        { appState.language === 'english' ? 'Shop' : 'חנות' }</h4>
            </div>
            <div 
                className={ 'nav_item ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }
                onClick={ () => selectPage('cart') }
                >
                <h4
                    className={ appState.page === 'cart' ? 'selected' : '' }>
                    <i className="fas fa-shopping-cart"></i>
                    ({itemsInCart})
                    { appState.language === 'english' ? ' Cart' : ' עגלה' }</h4>
                
            </div>
            <div 
                className='nav_item'
                onClick={ () => selectPage('contact') }
                >
                <h4
                    className={ appState.page === 'contact' ? 'selected' : '' }
                    >{ appState.language === 'english' ? 'Contact' : 'צור קשר' }</h4>
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
            <div 
                className='nav_item'
                >
                <h4
                    className={ 'language ' + ( appState.language === 'english' ? 'selected ' : '' ) }
                    onClick={ () => changeLenguage( 'english' ) }
                    >English</h4>
                <h4
                    className={ 'language ' + ( appState.language === 'hebrew' ? 'selected ' : '' ) }
                    onClick={ () => changeLenguage( 'hebrew' ) }
                    >עברית</h4>
            </div>
        </div>
    )
}


export default MainMenu

