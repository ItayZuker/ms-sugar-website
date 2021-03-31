import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../Context/shopContext'
import './shop_menu.scss'

const ShopMenu = () => {

    const { appState, setAppState } = useContext( ShopContext )
    const history = useHistory()

    const products = ['decks', 'grips', 'wheels', 'bearings', 'trucks', 'extra', 'sugar']

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
            return { ...prevState, currentProductType: product}
        })
        history.push( `/shop/${ product }` )
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    return (
        <div className='desktop_shop_menu_container'>
           { products.map( ( product, index ) => {
                return <div 
                        key={ index }
                        className='dropdown_item_container'
                        onClick={ () => selectProduct( product ) }>
                        { addIcon( product ) }
                        <h3
                            className={ appState.currentProductType === product ? 'selected' : '' }
                            >{ capitalFirst( product ) }</h3>
                    </div>
                }
            )}   
        </div>
    )
}

export default ShopMenu