import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../../../../Context/shopContext'
import Option from './Option/Option'
import './options.scss'

const Options = ( props ) => {

    const { appState } = useContext( ShopContext )

    return (
        <div className='desktop_options_container'>
            <h3>{ appState.language === 'english' ? 'Choose Configuration:' : 'אפשרויות:' }</h3>
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