import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../Context/shopContext'
import ProductDropdownMenu from './ProductDropdownMenu/ProductDropdownMenu'
import './product_dropdown.scss'

const ProductDropdown = () => {
 
    const { appState, setAppState } = useContext( ShopContext )
   
    const handleClick = ( ) => {
        if ( appState.productMenu.open ) {
            setAppState ( prevState => {
                return { ...prevState, productMenu: { open: false } }
            })
        } else {
            setAppState ( prevState => {
                return { ...prevState, productMenu: { open: true } }
            })
        }
    }

    return (
        <div className={ 'product_dropdown_container ' + ( appState.productMenu.open ? 'menu_open' : '' )}>
            <h3
                onClick={ handleClick }>
                { appState.language === 'english' ? 'Shop' : 'חנות' }
            </h3>
                <i className={ appState.productMenu.open ? "fas fa-times" : "fas fa-caret-down" }></i>
            <ProductDropdownMenu />
        </div>
    )
}

export default ProductDropdown