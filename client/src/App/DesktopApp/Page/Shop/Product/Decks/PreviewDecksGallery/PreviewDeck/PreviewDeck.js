import React from 'react'
import { useHistory } from 'react-router-dom'
import './preview_deck.scss'

const PreviewDeck = ( props ) => {

    const history = useHistory()

    const selectItem = () => {
        history.push(`/shop/decks/${props.deck.id}`)
    }

    return (
        <div className='desktop_preview_deck_container'>
            <div 
                className='inner_container'
                onClick={ selectItem }>
                <img src={ props.deck.images[0].src } />
                { props.deck.availableForSale ? <h3 className='select'>Select</h3> : <h3 className='out_of_stock'>Out of stock</h3>}
            </div>
        </div>
    )
}

export default PreviewDeck