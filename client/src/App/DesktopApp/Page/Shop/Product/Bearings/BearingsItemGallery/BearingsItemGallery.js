import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import BearingsData from './BearingsData/BearingsData'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './desktop_bearings_item_gallery.scss'

const BearingsItemGallery = () => {

    const [ variant, setVariant ] = useState()
    const [ selectedBearings, setSelectedBearings ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ allBearings, setAllBearings ] = useState()
    const { collections } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const bearingsData = await getCollection()
                setAllBearings( bearingsData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( allBearings ) {
            const updateBearings = async () => {
                const currentBearings = await getCurrentBearings()
                setSelectedBearings( currentBearings )
            }
            updateBearings()
        }
    }, [ id, allBearings ])

    const getCurrentBearings = ( bearingsData ) => {
        if ( bearingsData ) {
            return new Promise( resolve => {
                const currentBearings = bearingsData.find( ( bearings, index ) => {
                    if ( bearings.id === id ) {
                        setCurrentIndex( index )
                        return bearings
                    }
                })
                resolve( currentBearings )
            })
        } else {
            return new Promise( resolve => {
                const currentBearings = allBearings.find( ( bearings, index ) => {
                    // if ( sugar.id === id ) {
                        setCurrentIndex( index )
                        return bearings
                    // }
                })
                resolve( currentBearings )
            })
        }
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const bearingsCollectionItem = collections.filter( collection => {
                return collection.title === 'bearings'
            })
            resolve( bearingsCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( allBearings ) {
            const changeBearings = async () => {
                const currentBearings = await allBearings.find( ( bearings, index ) => index === currentIndex )
                history.push(`/shop/bearings/${ currentBearings.id }`)
            }
            changeBearings()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allBearings.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allBearings.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    const goBack = () => {
        history.push('/shop/bearings')
    }

    if ( !selectedBearings ) return <LoadingShop />

    return (
        <div className='desktop_bearings_item_gallery_container'>
            <h3 
                className={ 'back_button ' + ( allBearings.length > 1 ? '' : 'hide ' ) }
                onClick={ goBack }>Back</h3>
            <div className='bearings_picture_gallery_container'>
                <div 
                    className={ 'left_button ' + ( allBearings.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img src={ variant ? variant[0].image.src : selectedBearings.images[0].src } />
                <div 
                    className={ 'right_button ' + ( allBearings.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <BearingsData productAPI={ selectedBearings } setVariant={ setVariant } />
        </div>
    )


    
}

export default BearingsItemGallery