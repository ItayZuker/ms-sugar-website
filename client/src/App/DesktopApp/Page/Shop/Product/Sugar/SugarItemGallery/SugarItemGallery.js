import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import SugarData from './SugarData/SugarData'
import './desktop_sugar_item_gallery.scss'
import { ShopContext } from '../../../../../../../Context/shopContext'

const SugarItemGallery = () => {

    const [ selectedSugar, setSelectedSugar ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ allSugars, setAllSugars ] = useState()
    const { collections, appState } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const sugarsData = await getCollection()
                setAllSugars( sugarsData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( allSugars ) {
            const updateSugar = async () => {
                const currentSugar = await getCurrentSugar()
                setSelectedSugar( currentSugar )
            }
            updateSugar()
        }
    }, [ id, allSugars ])

    const getCurrentSugar = ( sugarsData ) => {
        if ( sugarsData ) {
            return new Promise( resolve => {
                const currentSugar = sugarsData.find( ( sugar, index ) => {
                    if ( sugar.id === id ) {
                        setCurrentIndex( index )
                        return sugar
                    }
                })
                resolve( currentSugar )
            })
        } else {
            return new Promise( resolve => {
                const currentSugar = allSugars.find( ( sugar, index ) => {
                    // if ( sugar.id === id ) {
                        setCurrentIndex( index )
                        return sugar
                    // }
                })
                resolve( currentSugar )
            })
        }
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const sugarsCollectionItem = collections.filter( collection => {
                return collection.title === 'sugar'
            })
            resolve( sugarsCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( allSugars ) {
            const changeDeck = async () => {
                const currentSugar = await allSugars.find( ( sugar, index ) => index === currentIndex )
                history.push(`/shop/sugar/${ currentSugar.id }`)
            }
            changeDeck()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allSugars.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allSugars.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    const goBack = () => {
        history.push('/shop/sugar')
    }

    
    if ( !selectedSugar ) return <LoadingShop />

    return (
        <div className={ 'desktop_sugar_item_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            <h3 
                className={ 'back_button ' + ( allSugars.length > 1 ? '' : 'hide ' ) }
                onClick={ goBack }>{ appState.language === 'english' ? 'Back' : 'חזרה' }</h3>
            <div className='sugar_picture_gallery_container'>
                <div 
                    className={ 'left_button ' + ( allSugars.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img 
                    src={ selectedSugar.images[0].src }
                    alt='Sugar_Picture' />
                <div 
                    className={ 'right_button ' + ( allSugars.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <SugarData productAPI={ selectedSugar } />
        </div>
    )


    
}

export default SugarItemGallery