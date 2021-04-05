import React, { useState, useEffect, useContext } from 'react'
import { goToAnchor, configureAnchors  } from 'react-scrollable-anchor'
import { ShopContext } from '../../../../Context/shopContext'
import AboutMission from './AboutMission/AboutMission'
import skeleton from '../../../../images/Skeleton_Animation.gif'
import './mission.scss'

const Mission = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const { setAppState, appState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setAppState( prevState => {
            return { ...prevState, page: 'mission' }
        })
        setLoadComponent( true )
    }, [])

    configureAnchors({offset: -50, scrollDuration: 1000})

    return (
        <div className={ 'desktop_mission_container ' + ( loadComponent ? 'load_component' : '' ) }>
            <div className='skeleton_container'>
                <img src={ skeleton }/>
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