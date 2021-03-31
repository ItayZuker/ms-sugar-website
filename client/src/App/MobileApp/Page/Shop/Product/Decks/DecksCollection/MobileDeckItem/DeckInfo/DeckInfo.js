import React, { useEffect, useRef } from 'react'
import './deck_info.scss'

const DeckInfo = ( props ) => {

    const deckInfo_ref = useRef()

    useEffect(() => {
        deckInfo_ref.current.innerHTML = props.product.descriptionHtml
    }, [])

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    return (
        <div className={ 'deck_info_container ' + ( props.infoOpen ? '' : 'hide ' )}>
            <h3>Inspiration / { capitalFirst( props.product.title ) }</h3>
            <br />
            <p ref={ deckInfo_ref }></p>
        </div>
    )
}

export default DeckInfo