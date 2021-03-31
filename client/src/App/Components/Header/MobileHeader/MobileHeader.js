import React, { useContext } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import staticLogo from '../../../../images/Logo_White.png'
import MobileMainMenu from './MobileMainMenu/MobileMainMenu'
import './mobile_header.scss'

const MobileHeader = () => {

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
        <div className='mobile_header_container '>
            <div className='mobile_header'>
                <i
                    className={ appState.mainMenu.open ? "fas fa-times" : "fas fa-bars" }
                    onClick={ openMenu }></i>
                <img
                    className={ appState.mainMenu.open ? 'menu_open' : '' }
                    src={ staticLogo }>    
                </img>
            </div>
            <MobileMainMenu />
        </div>
    )
}

export default MobileHeader