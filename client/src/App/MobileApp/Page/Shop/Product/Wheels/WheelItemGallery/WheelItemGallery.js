import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import LoadingShop from '../../../ShopComponents/LoadingShop/LoadingShop'
import WheelData from './WheelData/WheelData'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './mobile_wheel_item_gallery.scss'

const WheelItemGallery = () => {

    const [ selectedItem, setSelectedItem ] = useState()
    const [ currentIndex, setCurrentIndex ] = useState()
    const [ collection, setCollection ] = useState()
    const { collections, appState } = useContext( ShopContext )
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if ( collections ) {
            const fetchData = async () => {
                const collectionData = await getCollection()
                setCollection( collectionData )
            }
            fetchData()
        }
    }, [ collections ])

    useEffect(() => {
        if ( collection ) {
            const updateItem = async () => {
                const currentItem = await getCurrentItem()
                setSelectedItem( currentItem )
            }
            updateItem()
        }
    }, [ id, collection ])

    const getCurrentItem = () => {
        return new Promise( resolve => {
            const currentItem = collection.find( ( item, index ) => {
                if ( item.id === id ) {
                    setCurrentIndex( index )
                    return item
                }
            })
            resolve( currentItem )
        })
    }

    const getCollection = () => {
        return new Promise( resolve => {
            const decksCollectionItem = collections.filter( collection => {
                return collection.title === 'wheels'
            })
            resolve( decksCollectionItem[0].products )
        })
    }

    useEffect(() => {
        if ( collection ) {
            const changeDeck = async () => {
                const currentItem = await collection.find( ( item, index ) => index === currentIndex )
                history.push(`/shop/wheels/${ currentItem.id }`)
            }
            changeDeck()
        }
    }, [ currentIndex ])

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === collection.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( collection.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
        }
    }

    if ( !selectedItem ) return <LoadingShop />

    return (
        <div className={ 'mobile_wheel_item_gallery_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            <div className='wheel_picture_gallery_container'>
                <div 
                    className={ 'left_button ' + ( collection.length > 1 ? '' : 'hide ' ) }
                    onClick={ () => changeSelection( 'left' ) } >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <img 
                    src={ selectedItem.images[0].src }
                    alt='Wheel_Picture' />
                <div 
                    className={ 'right_button ' + ( collection.length > 1 ? '' : 'hide ' ) }
                    onClick={ () => changeSelection( 'right' ) } >
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
            <WheelData productAPI={ selectedItem } />
        </div>
    )


    
}

export default WheelItemGallery