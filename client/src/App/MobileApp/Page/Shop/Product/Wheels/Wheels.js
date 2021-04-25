import React, { useState, useContext, useEffect } from 'react'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import { ShopContext } from '../../../../../../Context/shopContext'
import MobileWheelItem from './MobileWheelItem/MobileWheelItem'
import WheelItemGallery from './WheelItemGallery/WheelItemGallery'
import { useParams } from 'react-router-dom'
import PreviewWheelsGallery from './PreviewWheelsGallery/PreviewWheelsGallery'
import './wheels.scss'

const Wheels = () => {

    const { setAppState } = useContext( ShopContext )
    const { id } = useParams()

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'wheels' }
        })
    }, [])

    return (
        <div
            className='wheels_container'>
            { id ? <WheelItemGallery /> : <PreviewWheelsGallery /> }
        </div>
    )
}

export default Wheels