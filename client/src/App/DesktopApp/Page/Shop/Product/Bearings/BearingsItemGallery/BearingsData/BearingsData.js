import React, { useEffect, useContext, useState, useRef } from 'react'
import Options from './Options/Options'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import  './bearings_data.scss'

const BearingsData = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const { currencyData, addItemToCheckout, getPrice, appState } = useContext( ShopContext )
    const [ stockNotification, setStockNotification ] = useState()
    const bearingsInfo_ref = useRef()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct()
            const price = await getPrice( data )
            setPrice( price )
            setProduct( data )
            props.setVariant( data.variant )
            bearingsInfo_ref.current.innerHTML = data.description
            appState.language === 'english' ? setStockNotification( 'Out of stock' ) : setStockNotification( 'נגמר המלאי' )
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
        if ( props.productAPI.availableForSale ) {
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
        <div className='desktop_bearings_data_container'>
            <h3 className='title'>{ appState.language === 'english' ? capitalFirst( product.title ) : 'לאגרים' }</h3>
            <h4 className={ 'price ' + ( props.productAPI.availableForSale ? 'active' : '' )}>
                { props.productAPI.availableForSale ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                </h4>
            <h3 className='inspiration_title'>{ appState.language === 'english' ? 'Inspiration' : 'השראה' }</h3>
            <p ref={ bearingsInfo_ref }></p>
            <div className='bottom_section'>
                { props.productAPI.availableForSale ? <Options product={ product } setProduct={ setProduct } productAPI={ props.productAPI } setVariant={ props.setVariant } /> : null }
                <button 
                    className={ ( props.productAPI.availableForSale ? 'active ' : ' ' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) } 
                    onClick={ e => addToCart(e) }>{ appState.language === 'english' ? 'Add to cart' : 'להוסיף לעגלה' }</button>
            </div>
        </div>
    )
}

export default BearingsData