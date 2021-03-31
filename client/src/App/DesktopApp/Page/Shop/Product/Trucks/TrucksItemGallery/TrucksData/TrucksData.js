import React, { useEffect, useContext, useState, useRef } from 'react'
import Options from './Options/Options'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import  './trucks_data.scss'

const TrucksData = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const { currencyData, addItemToCheckout, getPrice } = useContext( ShopContext )
    const trucksInfo_ref = useRef()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct()
            const price = await getPrice( data )
            setPrice( price )
            setProduct( data )
            props.setVariant( data.variant )
            trucksInfo_ref.current.innerHTML = data.description
        }
        fetchData()
    }, [ props.productAPI ])

    useEffect( () => {
        if ( product ) {
            const fetchData = async () => {
                const price = await getPrice( product )
                setPrice( price )
            }
            fetchData()
        }
    }, [ getPrice ])

    const getProduct = () => {
        return new Promise( resolve => {
            const data = updateItem( props.productAPI )
            resolve( data )
        } )
    }

    const addToCart = (e) => {
        e.preventDefault()
        addItemToCheckout( product.variant[0].id, 1 )
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    if ( !product ) return <></>

    return (
        <div className='desktop_trucks_data_container'>
            <h3 className='title'>{ capitalFirst( product.title ) }</h3>
            <h4 className={ 'price ' + ( props.productAPI.availableForSale ? 'active' : '' )}>
                { props.productAPI.availableForSale ? currencyData.currentCurrencySymbole + ' ' + price : 'Out of stock' }
                </h4>
            <h3 className='inspiration_title'>Info</h3>
            <p ref={ trucksInfo_ref }></p>
            <div className='bottom_section'>
                { props.productAPI.availableForSale ? <Options product={ product } setProduct={ setProduct } productAPI={ props.productAPI } setVariant={ props.setVariant } /> : null }
                <button 
                    className={ props.productAPI.availableForSale ? 'active' : '' } 
                    onClick={ e => addToCart(e) }>Add to cart</button>
            </div>
        </div>
    )
}

export default TrucksData