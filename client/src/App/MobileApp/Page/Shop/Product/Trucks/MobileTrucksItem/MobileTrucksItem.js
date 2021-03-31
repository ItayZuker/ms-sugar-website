import React from 'react'
import TrucksItem from './TrucksItem/TrucksItem'
import './mobile_trucks_item.scss'

const MobileDeckItem = ( props ) => {

    return (
        <div className='mobile_trucks_item_container'>
            <TrucksItem trucksAPI={ props.trucksAPI }/>
        </div>
    )
}

export default MobileDeckItem