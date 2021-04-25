import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../Context/shopContext'
import ProductDropdown from './ProductDropdown/ProductDropdown'
import './shop_header.scss'

const ShopHeader = () => {

    const { appState } = useContext( ShopContext )
    const history = useHistory()

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }
    
    const translateProduct = ( product ) => {
        switch ( product ) {
            case 'decks': return 'קרשים'
            case 'grips': return 'גריפים'
            case 'wheels': return 'גלגלים'
            case 'bearings': return 'לאגרים'
            case 'trucks': return 'צירים'
            case 'extra': return 'אקסטרה'
            // case 'sugar': return 'Sugar'
            default: return product
        }
    }

    const goBack = ( productType ) => {
        switch ( productType ) {
            case 'decks': 
                history.push( '/shop/decks' )
                break
            case 'grips': 
                history.push( '/shop/grips' )
                break
            case 'wheels': 
                history.push( '/shop/wheels' )
                break
            case 'bearings': 
                history.push( '/shop/bearings' )
                break
            case 'trucks': 
                history.push( '/shop/trucks' )
                break
            case 'extra': 
                history.push( '/shop/extra' )
                break
            default: return
        }
    }

    return (
        <div className={ 'shop_header_container ' + (appState.productMenu.open ? 'menu_open' : '') }>
            <ProductDropdown />
            <div className={ 'selected_product_container ' + ( appState.productMenu.open ? 'menu_open' : ''  ) }>
                <h3
                    onClick={ () => goBack( appState.currentProductType ) }>
                    { appState.language === 'english' ? capitalFirst( appState.currentProductType ) : translateProduct( appState.currentProductType ) }
                </h3>
            </div>
        </div>
        
    )
}

export default ShopHeader