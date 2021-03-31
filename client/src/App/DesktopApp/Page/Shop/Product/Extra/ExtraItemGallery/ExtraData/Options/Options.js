import React from 'react'
import Option from './Option/Option'
import './options.scss'

const Options = ( props ) => {

    return (
        <div className={ 'desktop_options_container ' + ( props.product.options.length > 0 ? '' : 'hide ' ) }>
            <h3>Choose Configuration:</h3>
            { props.product.options.map( option => {
                return (
                    <Option 
                        key={ option.name }
                        option={ option }
                        product={ props.product }
                        setProduct={ props.setProduct }
                        setVariant={ props.setVariant }
                        productAPI={ props.productAPI } />
                )
            } ) }            
        </div>
    )
}

export default Options