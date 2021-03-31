import React, { useContext, useEffect, useState, useRef } from 'react'
import BearingsOptionsContainer from './BearingsOptionsContainer/BearingsOptionsContainer'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import './bearings_item.scss'
import { ShopContext } from '../../../../../../../../Context/shopContext'

const MobileBearingsItem = ( props ) => {

    const [ product, setProduct ] = useState('')
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const { addItemToCheckout, currencyData, getPrice } = useContext( ShopContext)
    const bearingsInfo_ref = useRef()
    
    useEffect(() => {
        getProduct()
    }, [ props.bearingsAPI ])

    const getProduct = async() => {
        const data = await updateItem( props.bearingsAPI )
        const price = await getPrice( data )
        setPrice( price )
        setProduct( data )
        bearingsInfo_ref.current.innerHTML = data.description
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
        addItemToCheckout( product.variant[0].id, 1 )
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    if ( product === '' ) return <div>loading</div>

    return (
        <div className='bearings_item_container'>
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
                        return <BearingsOptionsContainer
                            key={ option.name }
                            option={ option }
                            product={ product }
                            productAPI={ props.bearingsAPI }
                            setProduct={ setProduct } />
                    }) }
                </div>
                <button
                    className={ product.variant ? 'active' : '' } 
                    onClick={ e => addToCart(e) }>Add to cart</button>
                <p ref={ bearingsInfo_ref }></p>
            </div>
        </div>
    )
}

export default MobileBearingsItem