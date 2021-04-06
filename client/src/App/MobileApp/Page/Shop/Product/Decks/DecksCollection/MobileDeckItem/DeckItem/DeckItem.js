import React, { useContext, useEffect, useState } from 'react'
import DeckOptionsContainer from './DeckOptionsContainer/DeckOptionsContainer'
import { useGetItem } from '../../../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../../../Context/shopContext'
import './deck_item.scss'

const DeckItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setStockNotification ] = useState()
    const { addItemToCheckout, currencyData, getPrice, appState } = useContext( ShopContext )
    
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
        if ( props.product.availableForSale ) {
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
            case 'deck #1': return 'קרש #1'
            case 'deck #2': return 'קרש #2'
            case 'deck #3': return 'קרש #3'
            case 'deck #4': return 'קרש #4'
            case 'deck #5': return 'קרש #5'
            default: return title
        }
    }

    if ( !product ) return <></>

    return (
        <div className={ 'deck_item_container ' + ( props.infoOpen ? 'hide ' : '' )}>
            <img 
                src={ product.images[0].src }
                alt='product'></img>
            <div className='item_data_container'>
                <h3>
                    { appState.language === 'english' ? capitalFirst( product.title ) : translateTitle( product.title ) }
                </h3>
                <h4 className={ 'price ' + ( props.product.availableForSale ? 'active ' : '' ) + ( appState.language === 'english' ? '' : 'hebrew ') }>
                    { props.product.availableForSale ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                </h4>
                <div className={ 'options_container ' + ( props.product.availableForSale ? '' : 'hide ' ) }>
                    { product.options.map( option => {
                        return <DeckOptionsContainer
                            key={ option.name }
                            option={ option }
                            product={ product }
                            productAPI={ props.product }
                            setProduct={ setProduct } />
                    }) }
                </div>
                <button
                    className={ props.product.availableForSale ? 'active' : '' } 
                    onClick={ e => addToCart(e) }>
                    { appState.language === 'english' ? 'Add to cart' : 'להוסיף לעגלה' }
                    </button>
            </div>
        </div>
    )
}

export default DeckItem