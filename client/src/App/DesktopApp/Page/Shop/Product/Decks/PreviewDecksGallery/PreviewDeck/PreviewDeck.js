import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import './preview_deck.scss'

const PreviewDeck = ( props ) => {

    const { appState } = useContext( ShopContext )
    const history = useHistory()

    const selectItem = () => {
        history.push(`/shop/decks/${props.deck.id}`)
    }

    return (
        <div className='desktop_preview_deck_container'>
            <div 
                className={ 'inner_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }
                onClick={ selectItem }>
                <img src={ props.deck.images[0].src } />
                { props.deck.availableForSale ? <h3 className='select'>{ appState.language === 'english' ? 'Select' : 'כניסה' }</h3> : <h3 className='out_of_stock'>{ appState.language === 'english' ? 'Out of stock' : 'נגמר המלאי' }</h3>}
            </div>
        </div>
    )
}

export default PreviewDeck