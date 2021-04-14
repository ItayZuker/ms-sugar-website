import React, { useContext, useState, useEffect} from 'react'
import { ShopContext } from '../../../../../../../Context/shopContext'
import PreviewDeck from './PreviewDeck/PreviewDeck'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import './preview_decks_gallery.scss'

const PreviewDecksGallery = ( props ) => {

    const { collections, appState } = useContext( ShopContext )
    const [ allDecks, setAllDecks ] = useState()

    useEffect( async() => {
        if ( collections ) {
            const collectionArray = await getCollection()
            setAllDecks( collectionArray )
        }
    }, [ collections ])


    const getCollection = () => {
        return new Promise( resolve => {
            const decksCollectionItem = collections.filter( collection => {
                return collection.title === 'decks'
            })
            resolve( decksCollectionItem[0].products )
        })
    }

    if ( !allDecks ) return <LoadingShop />

    return (
        <div className={ 'preview_decks_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            { allDecks.map( deck => {
                return <PreviewDeck 
                key={ deck.id }
                deck={ deck } />
            })}
        </div>
    )
}

export default PreviewDecksGallery