import React from 'react'
import AnimatedLogo from './AnimatedLogo/AnimatedLogo'
import LandscapeMainMenu from './LandscapeMainMenu/LandscapeMainMenu'
import TenPercentButton from './TenPercentButton/TenPercentButton'
import './desktop_header.scss'

const DesktopHeader = () => {

    return (
        <div className='landscape_header_container'>
            <AnimatedLogo />
            <LandscapeMainMenu />
            <TenPercentButton />
        </div> 
    )
}

export default DesktopHeader