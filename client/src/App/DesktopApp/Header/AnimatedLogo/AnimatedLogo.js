import React, { useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import whiteLogoFrames from '../../../../images/White_Logo_Animation_Frames.png'
import offWhiteLogoFrames from '../../../../images/Off_White_Logo_Animation_Frames.png'
import './animated_logo.scss'
import { ShopContext } from '../../../../Context/shopContext'

const AnimatedLogo = () => {

    const { setAppState } = useContext( ShopContext )
    const [ logoImg, setLogoImg ] = useState( offWhiteLogoFrames )
    let [ intervalId, setIntervalId ] = useState( 0 )
    let [ frameNum, setFrameNum ] = useState( 0 )
    const history = useHistory()
    const logoContainer_ref = useRef()
    const img_ref = useRef()

    const mouseEnter = () => {
        setLogoImg( whiteLogoFrames )
        const frameWidth = logoContainer_ref.current.offsetWidth
        setIntervalId( intervalId = setInterval( () => {
                img_ref.current.style.left = `-${frameNum * frameWidth}px`
                frameNum === 9 ? setFrameNum( frameNum = 0 ) : setFrameNum( frameNum += 1 )
            }, 100 )            
        )
    }

    const mouseLeave = () => {
        setLogoImg( offWhiteLogoFrames )
        clearInterval( intervalId )
    }

    const mouseClick = ( page ) => {
        setAppState( prevState => {
            return { ...prevState, page: page }
        })
        history.push('/mission')
    }

    return (
        <div
            ref={ logoContainer_ref }
            className='animated_logo_containet'>
            <img
                ref={ img_ref }
                src={ logoImg }
                onMouseEnter={ mouseEnter }
                onMouseLeave={ mouseLeave }
                onClick={ () => mouseClick( 'mission' ) }
                alt='Ms. Sugar Logo'
                ></img>
        </div>
    )
}

export default AnimatedLogo