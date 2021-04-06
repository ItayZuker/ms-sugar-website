import React, { useContext, useEffect, useState } from 'react'
import GripOptionsContainer from './GripOptionsContainer/GripOptionsContainer'
import { useGetItem } from '../../../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../../../Context/shopContext'
import './grip_item.scss'

const GripItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setStockNotification ] = useState()
    const { addItemToCheckout, currencyData, getPrice, appState } = useContext( ShopContext)
    
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
        const data = await updateItem( props.product )
        const price = await getPrice( data )
        setPrice( price )
        setProduct( data )
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

    const translateTitle = ( title ) => {
        switch ( title ) {
            case 'grip #1': return 'גריפ #1'
            default: return title
        }
    }

    if ( !product ) return <></>

    return (
        <div className='grip_item_container'>
            <img 
                src={ product.images[0].src }
                alt='product'></img>
            <div className='item_data_container'>
                <h3>
                    { appState.language === 'english' ? capitalFirst( product.title ) : translateTitle( product.title ) }
                </h3>
                <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock ' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                    { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                    </h4>
                <div className='options_container'>
                    { product.options.map( option => {
                        return <GripOptionsContainer
                            key={ option.name }
                            option={ option }
                            product={ product }
                            productAPI={ props.product }
                            setProduct={ setProduct } />
                    }) }
                </div>
                <button
                    className={ product.variant ? 'active' : '' } 
                    onClick={ e => addToCart(e) }>
                    { appState.language === 'english' ? 'Add to cart' : 'להוסיף לעגלה' }
                </button>
            </div>
        </div>
    )
}

export default GripItem