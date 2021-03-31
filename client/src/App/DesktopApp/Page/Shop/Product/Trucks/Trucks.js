import React, { useContext, useEffect } from 'react'
import TrucksItemGallery from './TrucksItemGallery/TrucksItemGallery'
import { ShopContext } from '../../../../../../Context/shopContext'
import './trucks.scss'

const Trucks = () => {

    const { setAppState } = useContext( ShopContext )

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'trucks' }
        })
    }, [])

    return (
        <div className='desktop_trucks_container'>
            <TrucksItemGallery />
        </div>
    )
}

export default Trucks