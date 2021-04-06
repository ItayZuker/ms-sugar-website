import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../../../../../../Context/shopContext'
import './item_summary.scss'

const ItemSummary = ( props ) => {

    const [ price, setPrice ] = useState()
    const { updateItemQuantityForCheckout, currencyData, getPrice, appState } = useContext( ShopContext )

    useEffect(() => {
        const fetchData = async () => {
            const price = await getPrice( [props.item] )
            setPrice( price )
        }
        fetchData()
    }, [ currencyData,  props.item.quantity ])

    const addToCart = (e) => {
        e.preventDefault()
        updateItemQuantityForCheckout( props.item.id, ( props.item.quantity + 1 ) )
    }

    const removeFromCart = (e) => {
        e.preventDefault()
        updateItemQuantityForCheckout( props.item.id, ( props.item.quantity - 1 ) )
    }

    return (
        <div className='item_summary_container'>
            <div className='quantity_container'>
                <button onClick={ addToCart }><i className="fas fa-plus"></i></button>
                <h4>{ props.item.quantity }</h4>
                <button onClick={ removeFromCart }><i className="fas fa-minus"></i></button>
            </div>
            <div className={ 'price_container ' + ( appState.language === 'english' ? '' : 'hebrew ') }>
                <h3>
                    { appState.language === 'english' ? currencyData.currentCurrencySymbole + props.item.quantity * price : null } 
                    { appState.language === 'english' ? ' :' : '' }               
                    { appState.language === 'english' ? 'Price' : 'מחיר' }
                    { appState.language === 'english' ? '' : ': ' }
                    { appState.language === 'english' ? null : currencyData.currentCurrencySymbole + props.item.quantity * price }
                </h3>
            </div>
        </div>
    )
}

export default ItemSummary