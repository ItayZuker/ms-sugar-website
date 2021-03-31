import React, { useContext, useEffect } from 'react'
import BearingsItemGallery from './BearingsItemGallery/BearingsItemGallery'
import { ShopContext } from '../../../../../../Context/shopContext'
import './bearings.scss'

const Bearings = () => {

    const { setAppState } = useContext( ShopContext )

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'bearings' }
        })
    }, [])

    return (
        <div className='desktop_bearings_container'>
            <BearingsItemGallery />
        </div>
    )
}

export default Bearings