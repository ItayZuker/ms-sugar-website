import React, { useContext, useEffect, useState } from 'react'
import TrucksOptionsContainer from './TrucksOptionsContainer/TrucksOptionsContainer'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import './trucks_item.scss'

const TrucksItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const { addItemToCheckout, currencyData, getPrice } = useContext( ShopContext)

    useEffect(() => {
        getProduct()
    }, [])

    const getProduct = async() => {
        const data = await updateItem( props.trucksAPI )
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

    if ( !product ) return <div>loading</div>

    return (
        <div className='trucks_item_container'>
            <div className='image_container'>
                <img 
                    src={ product.variant ? product.variant[0].image.src : product.images[0].src }
                    alt='product' />
            </div>
            <div className='selection_container'>
                <h3>{ capitalFirst( product.title ) }</h3>
                <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock' ) }>
                    { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : 'Out of stock' }
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
                <p>Text about the trucks Text about the trucks Text about the trucks Text about the trucks</p>
            </div>
        </div>
    )
}

export default TrucksItem