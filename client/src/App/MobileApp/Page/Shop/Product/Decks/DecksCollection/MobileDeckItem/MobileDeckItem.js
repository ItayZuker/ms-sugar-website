import React, { useState } from 'react'
import DeckItem from './DeckItem/DeckItem'
import DeckInfo from './DeckInfo/DeckInfo'
import './mobile_deck_item.scss'

const MobileDeckItem = ( props ) => {

    const [ infoOpen, setInfoOpen ] = useState( false )

    const clickDropdown = () => {
        infoOpen ? setInfoOpen( false ) : setInfoOpen( true )
    }

    return (
        <div className={ 'mobile_deck_item_container ' + ( infoOpen ? 'info_open ' : '' )}>
            <div 
                className='info_button_container'
                onClick={ clickDropdown }>
                <i className="fas fa-star"></i>
            </div>
            <DeckInfo
                product={ props.product }
                infoOpen={ infoOpen }/>
            <DeckItem
                product={ props.product }
                infoOpen={ infoOpen }/>
        </div>
    )
}

export default MobileDeckItem