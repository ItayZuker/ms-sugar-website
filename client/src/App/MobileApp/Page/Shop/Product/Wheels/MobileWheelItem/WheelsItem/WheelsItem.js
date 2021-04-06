import React, { useContext, useEffect, useState, useRef } from 'react'
import WheelsOptionsContainer from './WheelsOptionsContainer/WheelsOptionsContainer'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import './wheels_item.scss'

const MobileWheelItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setStockNotification ] = useState()
    const { addItemToCheckout, currencyData, getPrice, appState } = useContext( ShopContext )
    const wheelsInfo_ref = useRef()
    
    useEffect(() => {
        getProduct()
    }, [ props.wheelsAPI ])

    useEffect(() => {
        if ( appState.language === 'english' ) {
            setStockNotification( 'Out of stock' )
        } else {
            setStockNotification( 'נגמר המלאי' )
        }
    }, [ appState.language ])

    const getProduct = async() => {
        const data = await updateItem( props.wheelsAPI )
        const price = await getPrice( data )
        setPrice( price )
        setProduct( data )
        wheelsInfo_ref.current.innerHTML = data.description
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
        <div className='wheels_item_container'>
            <div className='image_container'>
                <img
                    src={ product.variant ? product.variant[0].image.src : product.images[0].src }
                    alt='product' />
            </div>
            <div className='selection_container'>
                <h3>
                    { appState.language === 'english' ? capitalFirst( product.title ) : 'גלגלים' }
                </h3>
                <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock ' ) + ( appState.language === 'english' ? '' : 'hebrew ') }>
                    { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                </h4>
                <div className='options_container'>
                    { product.options.map( option => {
                        return <WheelsOptionsContainer
                            key={ option.name }
                            option={ option }
                            product={ product }
                            productAPI={ props.wheelsAPI }
                            setProduct={ setProduct } />
                    }) }
                </div>
                <button
                    className={ product.variant ? 'active' : '' } 
                    onClick={ e => addToCart(e) }>Add to cart</button>
                <p ref={ wheelsInfo_ref }></p>
            </div>
        </div>
    )
}

export default MobileWheelItem