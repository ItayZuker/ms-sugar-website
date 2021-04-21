import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './product_dropdown_menu.scss'

const ProductDropdownMenu = ( props ) => {

    const { appState, setAppState } = useContext( ShopContext )
    const history = useHistory()

    const products = ['decks', 'grips', 'wheels', 'bearings', 'trucks', 'extra']

    const addIcon = ( product ) => {
        switch ( product ) {
            case 'decks': {
                return  // <--- add icon
            }
            case 'grips': {
                return  // <--- add icon
            }
            case 'wheels': {
                return  // <--- add icon
            }
            case 'bearings': {
                return  // <--- add icon
            }
            case 'trucks': {
                return  // <--- add icon
            }
            case 'extra': {
                return  // <--- add icon
            }
            case 'sugar': {
                return  // <--- add icon
            }
            default: return
        }
    }
    
    const selectProduct = ( product ) => {
        setAppState( prevState => {
            return { ...prevState, 
                currentProductType: product, 
                productMenu: { open: false }}
        })
        history.push( `/shop/${ product }` )
    }

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
            case 'sugar': return 'Sugar'
            default: return product
        }
    }

    return (
        <div className={ 'product_dropdown_menu_container ' + ( appState.productMenu.open ? 'menu_open' : '' ) }>
            { products.map( ( product, index ) => {
                return <div 
                        key={ index }
                        className='dropdown_item_container'>
                        { addIcon( product ) }
                        <h3
                            className={ appState.currentProductType === product ? 'selected' : '' }
                            onClick={ () => selectProduct( product ) }>
                            { appState.language === 'english' ? capitalFirst( product ) : translateProduct( product ) }
                        </h3>
                    </div>
                }
            )}   
        </div>
    )
}

export default ProductDropdownMenu