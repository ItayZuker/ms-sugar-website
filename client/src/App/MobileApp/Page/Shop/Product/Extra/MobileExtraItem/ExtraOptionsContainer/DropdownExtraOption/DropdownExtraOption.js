import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../customHooks/useGetItem'
import './dropdown_extra_option.scss'

const DropdownExtraOption = ( props ) => {

    const { setAppState } = useContext( ShopContext )
    const { updateItem } = useGetItem()

    const selectExtraVariant = async( value ) => {
        switch ( props.product.title ) {
            case 'bolts':
                const size = await getSelectedOption( 'size' )
                setAppState( prevState => {
                    return { ...prevState, optionMenu: { open: false, productTitle: '', option: '' }}
                })
                switch ( props.option.name ) {
                    case 'size':
                        const updatedSizeProduct = await updateItem( props.productAPI, value )
                        props.setProduct( updatedSizeProduct )
                        break
                    case 'color':
                        const updatedColorProduct = await updateItem( props.productAPI, size, value )
                        props.setProduct( updatedColorProduct )
                        break
                    default: break
                }
                break
            case 'spacer':
                setAppState( prevState => {
                    return { ...prevState, optionMenu: { open: false, productTitle: '', option: '' }}
                })
                switch ( props.option.name ) {
                    case 'color':
                        const updatedColorProduct = await updateItem( props.productAPI, value )
                        props.setProduct( updatedColorProduct )
                        break
                    default: break
                }
                break
            case 'tools':
                setAppState( prevState => {
                    return { ...prevState, optionMenu: { open: false, productTitle: '', option: '' }}
                })
                switch ( props.option.name ) {
                    case 'color':
                        const updatedColorProduct = await updateItem( props.productAPI, value )
                        props.setProduct( updatedColorProduct )
                        break
                    default: break
                }
                break
            case 'stencil':
                // No options
                break
            default: break
        }
    }

    const getSelectedOption = ( optionName ) => {
        return new Promise( resolve => {
            const value = props.product.variant[0].selectedOptions.filter( option => option.name === optionName )
            resolve( value[0].value )
        })
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    return (
        <div className={ 'dropdown_extra_option_container ' + ( props.dropdownOpen ? 'dropdown_open ' : '' ) }>
            { props.option.values.map( ( variant, index ) => {
                return <div 
                    key={ index }
                    className='variant_container' 
                    onClick={ () => selectExtraVariant( variant ) }>
                    <h3 className={ variant === props.selectedVariant ? 'selected_variant ' : '' }>
                    { capitalFirst( variant ) }</h3>
                </div>
            }) }
        </div>
    )
}

export default DropdownExtraOption