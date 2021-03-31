import React, { useContext } from 'react'
import { ShopContext } from '../../../Context/shopContext'
import MobileHeader from './MobileHeader/MobileHeader'
import DesktopHeader from './DesktopHeader/DesktopHeader'
import './header.scss'

const Header = () => {

    const { appState } = useContext(ShopContext)

    return (
        <div className={'header_container ' + (appState.mainMenu.open || appState.productMenu.open ? 'menu_open' : '')}>
            <DesktopHeader />
            <MobileHeader />
        </div>
    )
}

export default Header