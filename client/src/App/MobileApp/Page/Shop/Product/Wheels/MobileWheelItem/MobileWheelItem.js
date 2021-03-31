import React from 'react'
import WheelsItem from './WheelsItem/WheelsItem'
import './mobile_wheel_item.scss'

const MobileWheelItem = ( props ) => {
    
    return (
        <div className='mobile_wheel_item_container'>
            <WheelsItem wheelsAPI={ props.wheelsAPI }/>
        </div>
    )
}

export default MobileWheelItem