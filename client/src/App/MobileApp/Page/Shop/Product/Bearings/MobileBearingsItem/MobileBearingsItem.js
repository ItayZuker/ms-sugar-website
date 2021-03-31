import React from 'react'
import BearingsItem from './BearingsItem/BearingsItem'
import './mobile_bearings_item.scss'

const MobileBearingsItem = ( props ) => {

    return (
        <div className='mobile_bearings_item_container'>
            <BearingsItem bearingsAPI={ props.bearingsAPI }/>
        </div>
    )
}

export default MobileBearingsItem