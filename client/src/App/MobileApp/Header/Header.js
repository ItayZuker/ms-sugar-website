import React, { useContext } from 'react'
import CurrencyDropdown from './CurrencyDropdown/CurrencyDropdown'
import { ShopContext } from '../../../Context/shopContext'
import staticLogo from '../../../images/Logo_White.png'
import HeaderDropdown from './HeaderDropdown/HeaderDropdown'
import './header.scss'

const Header = () => {

    const { appState, setAppState } = useContext(ShopContext)

    const openMenu = () => {
        if (appState.mainMenu.open) {
            setAppState(prevState => {
                return { ...prevState,
                    mainMenu: {open: false},
                    productMenu: { open: false }, 
                    filterMenu: { open: false },}
            })
        } else {
            setAppState(prevState => {
                return { ...prevState,
                    mainMenu: {open: true},
                    productMenu: { open: false }, 
                    filterMenu: { open: false },
                    optionMenu: { open: false, option: '' }
                }
            })
        }
    }

    return (
        <div className={'header_container ' + (appState.mainMenu.open || appState.productMenu.open ? 'menu_open' : '')}>
            <div className='header'>
                <i
                    className={ appState.mainMenu.open ? "fas fa-times" : "fas fa-bars" }
                    onClick={ openMenu }></i>
                <img
                    className={ appState.mainMenu.open ? 'menu_open' : '' }
                    src={ staticLogo }
                    alt='logo'>    
                </img>
                <CurrencyDropdown />
            </div>
            <HeaderDropdown />
        </div>
    )
}

export default Header