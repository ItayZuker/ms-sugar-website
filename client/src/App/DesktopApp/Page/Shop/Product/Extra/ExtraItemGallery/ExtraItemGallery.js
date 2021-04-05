import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import ExtraData from './ExtraData/ExtraData'
import './desktop_extra_item_gallery.scss'
import { ShopContext } from '../../../../../../../Context/shopContext'

const DeckItemGallery = () => {

    const [ variant, setVariant ] = useState()
    const [ selectedExtra, setSelectedExtra ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ allExtras, setAllExtras ] = useState()
    const { collections, appState } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const extrasData = await getCollection()
                setAllExtras( extrasData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( allExtras ) {
            const updateExtra = async () => {
                const currentExtra = await getCurrentExtra()
                setSelectedExtra( currentExtra )
            }
            updateExtra()
        }
    }, [ id, allExtras ])

    const getCurrentExtra = ( extrasData ) => {
        if ( extrasData ) {
            return new Promise( resolve => {
                const currentExtra = extrasData.find( ( extra, index ) => {
                    if ( extra.id === id ) {
                        setCurrentIndex( index )
                        return extra
                    }
                })
                resolve( currentExtra )
            })
        } else {
            return new Promise( resolve => {
                const currentExtra = allExtras.find( ( extra, index ) => {
                    if ( extra.id === id ) {
                        setCurrentIndex( index )
                        return extra
                    }
                })
                resolve( currentExtra )
            })
        }
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const extrasCollectionItem = collections.filter( collection => {
                return collection.title === 'extra'
            })
            resolve( extrasCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( allExtras ) {
            const changeExtra = async () => {
                const currentExtra = await allExtras.find( ( extra, index ) => index === currentIndex )
                history.push(`/shop/extra/${ currentExtra.id }`)
            }
            changeExtra()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allExtras.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allExtras.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    const goBack = () => {
        history.push('/shop/extra')
    }

    if ( !selectedExtra ) return <LoadingShop />

    return (
        <div className={ 'desktop_extra_item_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            <h3 
                className={ 'back_button ' + ( appState.language === 'english' ? '' : 'hebrew ' ) + ( allExtras.length > 1 ? '' : 'hide ') }
                onClick={ goBack }>{ appState.language === 'english' ? 'Back' : 'חזרה' }</h3>
            <div className={ 'extra_picture_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                <div 
                    className={ 'left_button ' + ( allExtras.length > 1 ? '' : 'hide' ) }
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img src={ variant ? variant[0].image.src : selectedExtra.images[0].src } />
                <div 
                    className={ 'right_button ' +  ( allExtras.length > 1 ? '' : 'hide' ) }
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <ExtraData productAPI={ selectedExtra } setVariant={ setVariant } />
        </div>
    )


    
}

export default DeckItemGallery