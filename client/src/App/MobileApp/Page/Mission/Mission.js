import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import skeletonAnimation from '../../../../images/Skeleton_Animation.gif'
import AboutMission from './AboutMission/AboutMission'
import { goToAnchor, configureAnchors  } from 'react-scrollable-anchor'
import './mission.scss'

const Mission = () => {

    const { setAppState, appState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setAppState( prevState => {
            return { ...prevState, page: 'mission' }
        })
    }, [])

    configureAnchors({offset: -50, scrollDuration: 500})


    return (
        <div className='mission_container'>
            <div className='Skeleton_container'>
            <img 
                src={ skeletonAnimation } 
                alt='skeleton_skater'/>
            <div 
                className='button_container'
                onClick={ () => goToAnchor('mission_section') }
                >
                <h3>{ appState.language === 'english' ? 'More' : 'למטה' }</h3>
                <i className="fas fa-caret-down"></i>
            </div>
            </div>
                <AboutMission />
        </div>
    )
}

export default Mission