import React, { useContext, useEffect, useState } from 'react'
import GripOptionsContainer from './GripOptionsContainer/GripOptionsContainer'
import { useGetItem } from '../../../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../../../Context/shopContext'
import './grip_item.scss'

const GripItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const { addItemToCheckout, currencyData, getPrice } = useContext( ShopContext)
    
    useEffect(() => {
        getProduct()
    }, [])

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

    if ( !product ) return <></>

    return (
        <div className='grip_item_container'>
            <img 
                src={ product.images[0].src }
                alt='product'></img>
            <div className='item_data_container'>
                <h3>{ capitalFirst( product.title ) }</h3>
                <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock' ) }>
                    { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : 'Out of stock' }
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
                    onClick={ e => addToCart(e) }>Add to cart</button>
            </div>
        </div>
    )
}

export default GripItem