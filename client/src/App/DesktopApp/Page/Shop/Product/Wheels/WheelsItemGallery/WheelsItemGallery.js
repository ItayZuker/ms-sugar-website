import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import WheelsData from './WheelsData/WheelsData'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './desktop_wheels_item_gallery.scss'

const WheelsItemGallery = () => {

    const [ variant, setVariant ] = useState()
    const [ selectedWheels, setSelectedWheels ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ allWheels, setAllSugars ] = useState()
    const { collections } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const wheelsData = await getCollection()
                setAllSugars( wheelsData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( allWheels ) {
            const updateWheels = async () => {
                const currentWheels = await getCurrentWheels()
                setSelectedWheels( currentWheels )
            }
            updateWheels()
        }
    }, [ id, allWheels ])

    const getCurrentWheels = ( wheelsData ) => {
        if ( wheelsData ) {
            return new Promise( resolve => {
                const currentWheels = wheelsData.find( ( wheels, index ) => {
                    if ( wheels.id === id ) {
                        setCurrentIndex( index )
                        return wheels
                    }
                })
                resolve( currentWheels )
            })
        } else {
            return new Promise( resolve => {
                const currentWheels = allWheels.find( ( wheels, index ) => {
                    // if ( sugar.id === id ) {
                        setCurrentIndex( index )
                        return wheels
                    // }
                })
                resolve( currentWheels )
            })
        }
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const wheelsCollectionItem = collections.filter( collection => {
                return collection.title === 'wheels'
            })
            resolve( wheelsCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( allWheels ) {
            const changeWheels = async () => {
                const currentWheels = await allWheels.find( ( wheels, index ) => index === currentIndex )
                history.push(`/shop/wheels/${ currentWheels.id }`)
            }
            changeWheels()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allWheels.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allWheels.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    const goBack = () => {
        history.push('/shop/wheels')
    }

    if ( !selectedWheels ) return <LoadingShop />

    return (
        <div className='desktop_wheels_item_gallery_container'>
            <h3 
                className={ 'back_button ' + ( allWheels.length > 1 ? '' : 'hide ' ) }
                onClick={ goBack }>Back</h3>
            <div className='wheels_picture_gallery_container'>
                <div 
                    className={ 'left_button ' + ( allWheels.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img src={ variant ? variant[0].image.src : selectedWheels.images[0].src } />
                <div 
                    className={ 'right_button ' + ( allWheels.legth > 1 ? '' : 'hide ') }
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <WheelsData productAPI={ selectedWheels } setVariant={ setVariant } />
        </div>
    )


    
}

export default WheelsItemGallery