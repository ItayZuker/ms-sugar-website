import React, { useEffect, useState, useRef } from 'react'
import DropdownExtraOption from './DropdownExtraOption/DropdownExtraOption'
import './extra_options_container.scss'

const ExtraOptionsContainer = ( props ) => {

    const [ selectedVariant, setSelectedVariant ] = useState( '' )
    const [ dropdownOpen, setDropdownOpen ] = useState( false )
    const selectedVariantContainer_ref = useRef()

    useEffect(() => {
        if (props.product.options[0].name) {
            setOption( props.product )
        }
    }, [ props.product ])

    const setOption = async ( product ) => {
        const variant = await getVariant( product, props.option.name )
        setSelectedVariant( variant.value )
    }

    const getVariant = ( product, option ) => {
        return new Promise( resolve => {
            const variants = product.variant[0].selectedOptions.map( variant => {
                return { name: variant.name, value: variant.value }
            })
            const optionVariant = variants.filter( variant => variant.name === option)
            resolve( optionVariant[0] )
        })
    }

    const clickDropdown = () => {
        if ( dropdownOpen ) {
            setDropdownOpen( false )
        } else if ( document.activeElement === selectedVariantContainer_ref.current && props.option.values.length > 1 ) {
            setDropdownOpen( true )
        }
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    return (
        <div className='extra_options_container'>
            <div 
                className='selected_variant_container'
                tabIndex={ -1 }
                onClick={ clickDropdown }
                onBlur={ () => {
                    setTimeout(() => setDropdownOpen( false ), 10);
                } }
                ref={ selectedVariantContainer_ref }
                >
                <div className='variant'>
                    { props.option.values.length > 0 ? <h3 className='title'>{ capitalFirst( props.option.name ) }:</h3> : null }
                    <h3 className={ 'selected_variant ' + ( props.option.name )}>
                        { capitalFirst( selectedVariant ) }
                    </h3>
                </div>
                <i className={ ( dropdownOpen ? "fas fa-times dropdown_open" : "fas fa-caret-down " ) + ( props.option.values.length > 1 ? '' : 'no_dropdown ' ) }></i>
            </div>
            <DropdownExtraOption 
                option={ props.option }
                selectedVariant={ selectedVariant }
                product={ props.product } 
                productAPI={ props.productAPI }
                setProduct={ props.setProduct }
                dropdownOpen={ dropdownOpen } />
        </div>
    )
}

export default ExtraOptionsContainer