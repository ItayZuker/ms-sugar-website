import React, { useContext, useEffect } from 'react'
import WheelsItemGallery from './WheelsItemGallery/WheelsItemGallery'
import './wheels.scss'
import { ShopContext } from '../../../../../../Context/shopContext'

const Wheels = () => {

    const { setAppState } = useContext( ShopContext )

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'wheels' }
        })
    }, [])

    return (
        <div className='desktop_wheels_container'>
            <WheelsItemGallery />
        </div>
    )
}

export default Wheels