import React, { useContext } from 'react'
import ItemSummary from './ItemSummary/ItemSummary'
import './checkout_item.scss'
import { ShopContext } from '../../../../../Context/shopContext'

const CheckoutItem = (props) => {

    const { appState } = useContext( ShopContext )

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    const translateName = ( name ) => {
        switch ( name ) {
            case 'deck #5': return 'קרש #5'
            case 'deck #4': return 'קרש #4'
            case 'deck #3': return 'קרש #3'
            case 'deck #2': return 'קרש #2'
            case 'deck #1': return 'קרש #1'
            case 'grip #1': return 'גריפ #1'
            case 'stencil': return 'סטנסיל'
        default: return name
        }
    }

    const translateOptionName = ( optionName ) => {
        switch ( optionName ) {
            case 'size': return 'מידה'
            case 'concave': return 'זווית'
            case 'material': return 'חומר'
            case 'technology': return 'טכנולוגיה'
        default: return optionName
        }
    }

    const translateValue = ( value ) => {
        switch ( value ) {
            case 'pro': return 'מקצועי'
            case 'standard': return 'רגיל'
            case 'large': return 'גדול'
            case 'medium': return 'בינוני'
            case 'small': return 'שטוח'
            case 'maple wood': return 'עץ מייפל'
        default: return value
        }
    }

    return (
        <div className='desktop_checkout_item_container'>
            <div className='img_container'>
                <img 
                    src={ props.item.variant.image.src } 
                    alt='product'/>
            </div>
            <div className={ 'product_data_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                <div className='product_data'>
                    <h3>{ appState.language === 'english' ? capitalFirst( props.item.title ) : translateName( props.item.title ) }</h3>
                    <div className='options_container'>
                        { props.item.variant.selectedOptions.map( option => {
                            return <div 
                                key={ option.name }
                                className='option_container'>
                                    <h3>
                                        { appState.language === 'english' ? capitalFirst( option.name ) : translateOptionName( option.name ) }:</h3> 
                                    <h3 className={ appState.language === 'english' ? '' : 'hebrew ' }>
                                        { appState.language === 'english' ? capitalFirst( option.value ) : translateValue( option.value ) }</h3>
                                </div>
                        }) }
                    </div>
                </div>
                <ItemSummary item={ props.item }/>
            </div>
        </div>
    )
}

export default CheckoutItem