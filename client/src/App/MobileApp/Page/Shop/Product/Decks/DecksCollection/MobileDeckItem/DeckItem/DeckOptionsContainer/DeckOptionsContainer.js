import React, { useEffect, useState, useRef, useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../Context/shopContext'
import DropdownDeckOption from './DropdownDeckOption/DropdownDeckOption'
import './deck_options_container.scss'

const DeckOptionsContainer = ( props ) => {

    const { appState } = useContext( ShopContext)
    const [ selectedVariant, setSelectedVariant ] = useState( '' )
    const [ dropdownOpen, setDropdownOpen ] = useState( false )
    const selectedVariantContainer_ref = useRef()

    useEffect(() => {
        setOption( props.product )
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

    const translateName = ( name ) => {
        switch ( name ) {
            case 'size': return 'מידה'
            case 'concave': return 'זווית'
            case 'material': return 'חומר'
            default: return name
        }
    }

    const translateValue = ( value ) => {
        switch ( value ) {
            case 'large': return 'גדול'
            case 'medium': return 'בינוני'
            case 'small': return 'שטוח'
            case 'maple wood': return 'עץ מייפל'
            default: return value
        }
    }

    return (
        <div className='deck_options_container'>
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
                    <h3 className='title'>
                        { appState.language === 'english' ? capitalFirst( props.option.name ) : translateName( props.option.name ) }:
                    </h3>
                    <h3 className={ 'selected_variant ' + ( props.option.name ) }>
                        { appState.language === 'english' ? capitalFirst( selectedVariant ) : translateValue( selectedVariant ) }
                    </h3>
                </div>
                <i className={ ( dropdownOpen ? "fas fa-times dropdown_open" : "fas fa-caret-down " ) + ( props.option.values.length > 1 ? '' : 'no_dropdown ' ) }></i>
            </div>
            <DropdownDeckOption 
                option={ props.option }
                selectedVariant={ selectedVariant }
                product={ props.product } 
                productAPI={ props.productAPI }
                setProduct={ props.setProduct }
                dropdownOpen={ dropdownOpen } />
        </div>
    )
}

export default DeckOptionsContainer