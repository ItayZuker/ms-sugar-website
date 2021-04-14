import React, {useState, useEffect, useRef, useContext } from 'react'
import {useHistory} from 'react-router-dom'
import { ShopContext } from '../../../../Context/shopContext'
import TenPersentButton from '../../../../images/Ten_Persent_Button.png'
import './ten_percent_button.scss'

const TenPercentButton = () => {

    const { setAppState, appState } = useContext( ShopContext )
    let [ intervalId, setIntervalId ] = useState( 0 )
    let [ frameNum, setFrameNum ] = useState( 0 )
    const history = useHistory()

    const tenPercentButtonContainer_ref = useRef()
    const img_ref = useRef()

    useEffect(() => {

        if ( appState.page === 'discount' ) {
            if ( frameNum !== 5 ) {
                mouseClick()
            }
        } else {
            if ( frameNum !== 0 ) {
                unclick()
            }
        }
    }, [ appState.page ])

    const mouseEnter = () => {
        const frameWidth = tenPercentButtonContainer_ref.current.offsetWidth
        if (frameNum === 0) {
            setFrameNum(frameNum = 1)
            img_ref.current.style.left = `-${frameNum * frameWidth}px`
        } else if (frameNum === 5) {
            setFrameNum(frameNum = 6)
            img_ref.current.style.left = `-${frameNum * frameWidth}px`
        }
    }

    const mouseLeave = () => {
        const frameWidth = tenPercentButtonContainer_ref.current.offsetWidth
        if (frameNum === 1) {
            setFrameNum(frameNum = 0)
            img_ref.current.style.left = `-${frameNum * frameWidth}px`
        } else if (frameNum === 6) {
            setFrameNum(frameNum = 5)
            img_ref.current.style.left = `-${frameNum * frameWidth}px`
        }
    }

    const mouseClick = () => {
        const frameWidth = tenPercentButtonContainer_ref.current.offsetWidth
        if ( frameNum <= 1 ) {
                setIntervalId(intervalId = setInterval(() => {
                    if (frameNum === 5) {
                        setAppState(prevState => {
                            return { ...prevState, page: 'discount' }
                        })
                        history.push('/discount')
                        clearInterval(intervalId)
                    } else {
                        setFrameNum(frameNum += 1)
                        img_ref.current.style.left = `-${frameNum * frameWidth}px`
                    }       
                }, 100))
            } else if ( frameNum >= 5 ) {
                setIntervalId(intervalId = setInterval(() => {
                    if (frameNum === 9) {
                        setAppState(prevState => {
                            return { ...prevState, page: 'mission'}
                        })
                        history.push('/mission')
                        clearInterval(intervalId)
                        setFrameNum(frameNum = 0)
                        img_ref.current.style.left = `-${frameNum * frameWidth}px`
                    } else {
                        setFrameNum(frameNum += 1)
                        img_ref.current.style.left = `-${frameNum * frameWidth}px`
                    }        
                }, 100))
            }
    }

    const unclick = () => {
        const frameWidth = tenPercentButtonContainer_ref.current.offsetWidth
        setIntervalId(intervalId = setInterval(() => {
            if (frameNum === 9) {
                clearInterval(intervalId)
                setFrameNum(frameNum = 0)
                img_ref.current.style.left = `-${frameNum * frameWidth}px`
            } else {
                setFrameNum(frameNum += 1)
                img_ref.current.style.left = `-${frameNum * frameWidth}px`
            }        
        }, 100))
    }

    return (
        <div
            ref={tenPercentButtonContainer_ref}
            className='ten_percent_button_containet'>
            <img
                ref={ img_ref }
                src={ TenPersentButton }
                onMouseEnter={ mouseEnter }
                onMouseLeave={ mouseLeave }
                onClick={ mouseClick }
                alt='Ten_Percent_Button'
                ></img>
        </div>
    )
}

export default TenPercentButton