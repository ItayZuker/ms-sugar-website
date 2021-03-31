import React, { useContext, useEffect, useState, useRef } from 'react'
import ExtraOptionsContainer from './ExtraOptionsContainer/ExtraOptionsContainer'
import { useGetItem } from '../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './mobile_extra_item.scss'

const MobileDeckItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const { addItemToCheckout, currencyData, getPrice } = useContext( ShopContext)
    const description_ref = useRef()
    
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

    useEffect(() => {
        if( product ) {
            description_ref.current.innerHTML = product.description
        }
    }, [ product ])

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
        <div className='mobile_extra_item_container'>
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
                <div className='product_description'>
                    <p ref={ description_ref }></p>
                </div>
                <div className='options_container'>
                    { product.options.map( option => {
                        return <ExtraOptionsContainer
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

export default MobileDeckItem