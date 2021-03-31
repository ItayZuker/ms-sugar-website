import React from 'react'
import Option from './Option/Option'
import './options.scss'

const Options = ( props ) => {

    if ( !props.product.options ) return <></>

    return (
        <div className='desktop_options_container'>
            <h3>Choose Configuration:</h3>
            { props.product.options.map( option => {
                return (
                    <Option 
                        key={ option.name }
                        option={ option }
                        product={ props.product }
                        setProduct={ props.setProduct }
                        productAPI={ props.productAPI } />
                )
            } ) }            
        </div>
    )
}

export default Options