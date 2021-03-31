import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import ProductDropdown from './ProductDropdown/ProductDropdown'
import './shop_header.scss'

const ShopHeader = () => {

    const { appState } = useContext( ShopContext )

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }
    
    return (
        <div className={ 'shop_header_container ' + (appState.productMenu.open ? 'menu_open' : '') }>
            <ProductDropdown />
            <div className={ 'selected_product_container ' + ( appState.productMenu.open ? 'menu_open' : ''  ) }>
                <h3>{ capitalFirst( appState.currentProductType ) }</h3>
            </div>
        </div>
        
    )
}

export default ShopHeader