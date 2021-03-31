import React from 'react'
import ItemSummary from './ItemSummary/ItemSummary'
import './checkout_item.scss'

const CheckoutItem = (props) => {

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    return (
        <div className='desktop_checkout_item_container'>
            <div className='img_container'>
                <img 
                    src={ props.item.variant.image.src } 
                    alt='product'/>
            </div>
            <div className='product_data_container'>
                <div className='product_data'>
                    <h3>{ capitalFirst( props.item.title ) }</h3>
                    <div className='options_container'>
                        { props.item.variant.selectedOptions.map( option => {
                            return <div 
                                key={ option.name }
                                className='option_container'>
                                    <h3>{ capitalFirst( option.name ) }</h3> 
                                    <h3>: { capitalFirst( option.value ) }</h3>
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