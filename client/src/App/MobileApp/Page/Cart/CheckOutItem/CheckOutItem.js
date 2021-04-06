import React, { useContext } from 'react'
import ItemSummary from './ItemSummary/ItemSummary'
import './checkout_Item.scss'
import { ShopContext } from '../../../../../Context/shopContext'

const CheckoutItem = ( props ) => {

    const { appState } = useContext( ShopContext )

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
            case 'grip #1': return 'גריפ #1'
            case 'sugar #1': return 'שוגר #1'
            case 'stencil': return 'סטנסיל #1'
            default: return title
        }
    }

    const translateOption = ( optionName ) => {
        switch ( optionName ) {
            case 'size': return 'מידה'
            case 'concave': return 'זווית'
            case 'material': return 'חומר'
            case 'technology': return 'טכנולוגיה'
            case 'deck #5': return 'קרש #5'
            case 'author': return 'כתיבה'
            default: return optionName
        }
    }

    const translateValue = ( value ) => {
        switch ( value ) {
            case 'large': return 'גדול'
            case 'medium': return 'בינוני'
            case 'small': return 'שטוח'
            case 'pro': return 'טכנולוגיה'
            case 'standard': return 'רגיל'
            case 'maple wood': return 'עץ מייפל'
            default: return value
        }
    }

    return (
        <div className='checkout_Item_container'>
            <div className='img_container'>
                <img 
                    src={ props.item.variant.image.src } 
                    alt='product'/>
            </div>
            <div className='product_data_container'>
                <div className='product_data'>
                    <h3>{ appState.language === 'english' ? capitalFirst( props.item.title ) : translateTitle( props.item.title ) }</h3>
                </div>
                <div className='options_container'>
                    { props.item.variant.selectedOptions.map( option => {
                        return <div 
                            key={ option.name }
                            className='option_container'>
                                <h3>
                                    { appState.language === 'english' ? capitalFirst( option.name ) : translateOption( option.name ) }:
                                </h3> 
                                <h3 className={ appState.language !== 'english' && option.name !== 'size' ? '' : 'hebrew ' }>
                                    { appState.language === 'english' ? capitalFirst( option.value ) : translateValue( option.value ) }
                                </h3>
                            </div>
                    }) }
                </div>
                <ItemSummary item={ props.item }/>
            </div>
        </div>
    )
}

export default CheckoutItem