import React from 'react'
import AnimatedLogo from './AnimatedLogo/AnimatedLogo'
import MainMenu from './MainMenu/MainMenu'
import TenPercentButton from './TenPercentButton/TenPercentButton'
import './header.scss'

const DesktopHeader = () => {

    return (
        <div className='header_container'>
            <AnimatedLogo />
            <MainMenu />
            <TenPercentButton />
        </div> 
    )
}

export default DesktopHeader