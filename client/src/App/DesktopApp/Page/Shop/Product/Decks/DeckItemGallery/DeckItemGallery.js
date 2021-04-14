import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import DeckData from './DeckData/DeckData'
import './desktop_deck_item_gallery.scss'
import { ShopContext } from '../../../../../../../Context/shopContext'

const DeckItemGallery = () => {

    const [ selectedDeck, setSelectedDeck ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ allDecks, setAllDecks ] = useState()
    const { collections, appState } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const decksData = await getCollection()
                setAllDecks( decksData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( allDecks ) {
            const updateDeck = async () => {
                const currentDeck = await getCurrentDeck()
                setSelectedDeck( currentDeck )
            }
            updateDeck()
        }
    }, [ id, allDecks ])

    const getCurrentDeck = ( decksData ) => {
        if ( decksData ) {
            return new Promise( resolve => {
                const currentDeck = decksData.find( ( deck, index ) => {
                    if ( deck.id === id ) {
                        setCurrentIndex( index )
                        return deck
                    }
                })
                resolve( currentDeck )
            })
        } else {
            return new Promise( resolve => {
                const currentDeck = allDecks.find( ( deck, index ) => {
                    if ( deck.id === id ) {
                        setCurrentIndex( index )
                        return deck
                    }
                })
                resolve( currentDeck )
            })
        }
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const decksCollectionItem = collections.filter( collection => {
                return collection.title === 'decks'
            })
            resolve( decksCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( allDecks ) {
            const changeDeck = async () => {
                const currentDeck = await allDecks.find( ( deck, index ) => index === currentIndex )
                history.push(`/shop/decks/${ currentDeck.id }`)
            }
            changeDeck()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allDecks.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allDecks.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    const goBack = () => {
        history.push('/shop/decks')
    }

    if ( !selectedDeck ) return <LoadingShop />

    return (
        <div className={ 'desktop_deck_item_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            <h3 
                className={ 'back_button ' + ( appState.language === 'english' ? '' : 'hebrew' ) }
                onClick={ goBack }>{ appState.language === 'english' ? 'Back' : 'חזרה' }</h3>
            <div className={ 'deck_picture_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                <div 
                    className='left_button'
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img 
                    src={ selectedDeck.images[0].src }
                    alt='Deck_Picture' />
                <div 
                    className='right_button'
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <DeckData productAPI={ selectedDeck } />
        </div>
    )


    
}

export default DeckItemGallery