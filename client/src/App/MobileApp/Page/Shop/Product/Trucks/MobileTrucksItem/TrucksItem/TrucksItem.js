import React, { useContext, useEffect, useState, useRef } from 'react'
import TrucksOptionsContainer from './TrucksOptionsContainer/TrucksOptionsContainer'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import './trucks_item.scss'

const TrucksItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setStockNotification ] = useState()
    const { addItemToCheckout, currencyData, getPrice, appState } = useContext( ShopContext)
    const trucksInfo_ref = useRef()

    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        if ( appState.language === 'english' ) {
            setStockNotification( 'Out of stock' )
        } else {
            setStockNotification( 'נגמר המלאי' )
        }
    }, [ appState.language ])

    const getProduct = async() => {
        const data = await updateItem( props.trucksAPI )
        const price = await getPrice( data )
        setPrice( price )
        setProduct( data )
        trucksInfo_ref.current.innerHTML = data.description
    }

    useEffect( () => {
        if ( product ) {
            const fetchData = async () => {
                const price = await getPrice( product )
                setPrice( price )
            }
            fetchData()
        }
    }, [ getPrice ])

    const addToCart = (e) => {
        e.preventDefault()
        if ( product.variant ) {
            addItemToCheckout( product.variant[0].id, 1 )
        }
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    if ( !product ) return <></>

    return (
        <div className='trucks_item_container'>
            <div className='image_container'>
                <img 
                    src={ product.variant ? product.variant[0].image.src : product.images[0].src }
                    alt='product' />
            </div>
            <div className='selection_container'>
                <h3>
                    { appState.language === 'english' ? capitalFirst( product.title ) : 'צירים' }
                </h3>
                <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock ' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                    { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                </h4>
                <div className='options_container'>
                    { product.options.map( option => {
                        return <TrucksOptionsContainer
                            key={ option.name }
                            option={ option }
                            product={ product }
                            productAPI={ props.trucksAPI }
                            setProduct={ setProduct } />
                    }) }
                </div>
                <button
                    className={ product.variant ? 'active' : '' } 
                    onClick={ e => addToCart(e) }>Add to cart</button>
                <p ref={ trucksInfo_ref }></p>
            </div>
        </div>
    )
}

export default TrucksItem