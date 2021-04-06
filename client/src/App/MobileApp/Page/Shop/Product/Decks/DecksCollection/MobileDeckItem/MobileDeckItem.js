import React, { useContext, useState } from 'react'
import DeckItem from './DeckItem/DeckItem'
import DeckInfo from './DeckInfo/DeckInfo'
import './mobile_deck_item.scss'
import { ShopContext } from '../../../../../../../../Context/shopContext'

const MobileDeckItem = ( props ) => {

    const { appState } = useContext( ShopContext )
    const [ infoOpen, setInfoOpen ] = useState( false )

    const clickInfo = () => {
        infoOpen ? setInfoOpen( false ) : setInfoOpen( true )
    }

    return (
        <div className={ 'mobile_deck_item_container ' + ( infoOpen ? 'info_open ' : '' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
            <div 
                className='info_button_container'
                onClick={ clickInfo }>
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