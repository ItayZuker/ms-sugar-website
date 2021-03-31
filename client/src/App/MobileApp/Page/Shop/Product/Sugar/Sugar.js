import React, { useContext, useState, useEffect, useRef } from 'react'
import LoadingShop from '../../ShopComponents/LoadingShop/LoadingShop'
import { useParams, useHistory } from 'react-router-dom'
import './sugar.scss'
import { ShopContext } from '../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../customHooks/useGetItem'

const Sugar = () => {

    const [ currentIndex, setCurrentIndex ] = useState( 0 )
    const [ price, setPrice ] = useState()
    const [ allSugars, setAllSugars ] = useState()
    const { collections } = useContext( ShopContext )
    const [ product, setProduct ] = useState()
    const { updateItem } = useGetItem()
    const { currencyData, addItemToCheckout, getPrice } = useContext( ShopContext )
    const description_ref = useRef()

    useEffect(() => {
        const updateSugar = async () => {
            const allSugars = await getCollection()
            setAllSugars( allSugars )
            const currentSugarAPI = allSugars[0]
            const data = await getProduct( currentSugarAPI )
            const price = await getPrice( data )
            setPrice( price )
            setProduct( data )
        }
        updateSugar()
    }, [])

    useEffect( () => {
        if ( product ) {
            const fetchData = async () => {
                const price = await getPrice( product )
                setPrice( price )
            }
            fetchData()
        }
    }, [ getPrice ])

    const getCollection = () => {
        return new Promise( resolve => {
            const sugarsCollectionItem = collections.filter( collection => {
                return collection.title === 'sugar'
            })
            resolve( sugarsCollectionItem[0].products )
        })
    }

    const getCurrentSugar = ( allSugars ) => {
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

    const getProduct = ( selectedSugarAPI ) => {
        return new Promise( resolve => {
            const data = updateItem( selectedSugarAPI )
            resolve( data )
        } )
    }

    useEffect(() => {
        if( product ) {
            description_ref.current.innerHTML = product.description
        }
    }, [ product ])


    useEffect(() => {
        if ( allSugars ) {
            const changeDeck = async () => {
                const currentSugarAPI = await allSugars.find( ( sugar, index ) => index === currentIndex )
                const data = await getProduct( currentSugarAPI )
                setProduct( data )
            }
            changeDeck()
        }
    }, [ currentIndex ])

    const addToCart = (e) => {
        e.preventDefault()
        if ( product.variant ) {
            addItemToCheckout( product.variant[ 0 ].id, 1 )
        }
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

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

    if ( !product ) return <LoadingShop />

    return (
        <div className='sugar_container'>
            <div className='sugar_item'>
                <div className='gallery_container'>
                    <i 
                        className={ "fas fa-chevron-left " + ( allSugars.length > 1 ? '' : 'hide ') }
                        onClick={ () => changeSelection( 'left' ) }></i>
                    <div className='img_container'>
                        <img src={ product.images[0].src }/>
                    </div>
                    <i 
                        className={ "fas fa-chevron-right " + ( allSugars.length > 1 ? '' : 'hide ' ) }
                        onClick={ () => changeSelection( 'right' ) }></i>
                </div>
                <div className='selection_container'>
                    <h3>{ capitalFirst( product.title ) }</h3>
                    <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock' ) }>
                        { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : 'Out of stock' }
                    </h4>
                    <div className='product_description'>
                        <p ref={ description_ref }></p>
                    </div>
                    <button
                        className={ product.variant ? 'active' : '' } 
                        onClick={ e => addToCart( e ) }>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default Sugar