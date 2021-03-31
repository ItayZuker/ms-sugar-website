import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PreviewDecksGallery from './PreviewDecksGallery/PreviewDecksGallery'
import DeckItemGallery from './DeckItemGallery/DeckItemGallery'
import './decks.scss'
import { ShopContext } from '../../../../../../Context/shopContext'

const Decks = () => {

    const { setAppState } = useContext( ShopContext )
    const { id } = useParams()

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'decks' }
        })
    }, [])


    return (
        <div className='desktop_decks_container'>
            { id ? <DeckItemGallery /> : <PreviewDecksGallery /> }
        </div>
    )
}

export default Decks