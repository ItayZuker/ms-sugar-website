import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import TrucksData from './TrucksData/TrucksData'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './desktop_trucks_item_gallery.scss'

const TrucksItemGallery = () => {

    const [ variant, setVariant ] = useState()
    const [ selectedTrucks, setSelectedTrucks ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ allTrucks, setAllTrucks ] = useState()
    const { collections } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const trucksData = await getCollection()
                setAllTrucks( trucksData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( allTrucks ) {
            const updateTrucks = async () => {
                const currentTrucks = await getCurrentTrucks()
                setSelectedTrucks( currentTrucks )
            }
            updateTrucks()
        }
    }, [ id, allTrucks ])

    const getCurrentTrucks = ( trucksData ) => {
        if ( trucksData ) {
            return new Promise( resolve => {
                const currentTrucks = trucksData.find( ( trucks, index ) => {
                    if ( trucks.id === id ) {
                        setCurrentIndex( index )
                        return trucks
                    }
                })
                resolve( currentTrucks )
            })
        } else {
            return new Promise( resolve => {
                const currentTrucks = allTrucks.find( ( trucks, index ) => {
                    // if ( trucks.id === id ) {
                        setCurrentIndex( index )
                        return trucks
                    // }
                })
                resolve( currentTrucks )
            })
        }
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const trucksCollectionItem = collections.filter( collection => {
                return collection.title === 'trucks'
            })
            resolve( trucksCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( allTrucks ) {
            const changeTrucks = async () => {
                const currentTrucks = await allTrucks.find( ( trucks, index ) => index === currentIndex )
                history.push(`/shop/trucks/${ currentTrucks.id }`)
            }
            changeTrucks()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allTrucks.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allTrucks.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    const goBack = () => {
        history.push('/shop/trucks')
    }

    if ( !selectedTrucks ) return <LoadingShop />

    return (
        <div className='desktop_trucks_item_gallery_container'>
            <h3 
                className={ 'back_button ' + ( allTrucks.length > 1 ? '' : 'hide ' ) }
                onClick={ goBack }>Back</h3>
            <div className='trucks_picture_gallery_container'>
                <div 
                    className={ 'left_button ' + ( allTrucks.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img src={ variant ? variant[0].image.src : selectedTrucks.images[0].src } />
                <div 
                    className={ 'right_button ' + ( allTrucks.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <TrucksData productAPI={ selectedTrucks } setVariant={ setVariant } />
        </div>
    )


    
}

export default TrucksItemGallery