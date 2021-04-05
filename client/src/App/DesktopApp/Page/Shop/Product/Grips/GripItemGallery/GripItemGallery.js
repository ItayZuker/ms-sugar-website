import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import GripData from './GripData/GripData'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './desktop_grip_item_gallery.scss'

const DeckItemGallery = () => {

    const [ selectedGrip, setSelectedGrip ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ allGrips, setAllGrips ] = useState()
    const { collections, appState } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const gripsData = await getCollection()
                setAllGrips( gripsData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( allGrips ) {
            const updateGrip = async () => {
                const currentGrip = await getCurrentGrip()
                setSelectedGrip( currentGrip )
            }
            updateGrip()
        }
    }, [ id, allGrips ])

    const getCurrentGrip = ( gripsData ) => {
        if ( gripsData ) {
            return new Promise( resolve => {
                const currentGrip = gripsData.find( ( grip, index ) => {
                    if ( grip.id === id ) {
                        setCurrentIndex( index )
                        return grip
                    }
                })
                resolve( currentGrip )
            })
        } else {
            return new Promise( resolve => {
                const currentGrip = allGrips.find( ( grip, index ) => {
                    if ( grip.id === id ) {
                        setCurrentIndex( index )
                        return grip
                    }
                })
                resolve( currentGrip )
            })
        }
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const gripsCollectionItem = collections.filter( collection => {
                return collection.title === 'grips'
            })
            resolve( gripsCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( allGrips ) {
            const changeGrip = async () => {
                const currentDeck = await allGrips.find( ( deck, index ) => index === currentIndex )
                history.push(`/shop/grips/${ currentDeck.id }`)
            }
            changeGrip()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allGrips.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allGrips.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    const goBack = () => {
        history.push('/shop/grips')
    }

    if ( !selectedGrip ) return <LoadingShop />

    return (
        <div className={ 'desktop_grip_item_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            <h3 
                className={ 'back_button ' + ( appState.language === 'english' ? '' : 'hebrew ' ) + ( allGrips.length > 1 ? '' : 'hide ' ) }
                onClick={ goBack }>{ appState.language === 'english' ? 'Back' : 'חזרה' }</h3>
            <div className={ 'grip_picture_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                <div 
                    className={ 'left_button ' + ( allGrips.length > 1 ? '' : 'hide' ) }
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img src={ selectedGrip.images[0].src } />
                <div 
                    className={ 'right_button ' + ( allGrips.length > 1 ? '' : 'hide' ) }
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <GripData productAPI={ selectedGrip } />
        </div>
    )


    
}

export default DeckItemGallery