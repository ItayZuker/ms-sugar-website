import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../Context/shopContext'
import './shop_menu.scss'

const ShopMenu = () => {

    const [ products ] = useState(['decks', 'grips', 'wheels', 'bearings', 'trucks', 'extra', 'sugar'])
    const [ pageTitle, setPageTitle ] = useState()
    const { appState, setAppState } = useContext( ShopContext )
    const history = useHistory()

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

    const translate = ( product ) => {
        switch ( product ) {
            case 'decks': return 'קרשים'
            case 'grips': return 'גריפים'
            case 'wheels': return 'גלגלים'
            case 'bearings': return 'לאגרים'
            case 'trucks': return 'צירים'
            case 'extra': return 'אקסטרה'
            case 'sugar': return 'Sugar'
        }
    }

    return (
        <div className='desktop_shop_menu_container'>
           { products.map( ( product, index ) => {
                return <div 
                        key={ index }
                        className={ 'dropdown_item_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }
                        onClick={ () => selectProduct( product ) }>
                        { addIcon( product ) }
                        <h3
                            className={ appState.currentProductType === product ? 'selected' : '' }
                            >{ appState.language === 'english' ? capitalFirst( product ) : translate( product ) }</h3>
                    </div>
                }
            )}   
        </div>
    )
}

export default ShopMenu