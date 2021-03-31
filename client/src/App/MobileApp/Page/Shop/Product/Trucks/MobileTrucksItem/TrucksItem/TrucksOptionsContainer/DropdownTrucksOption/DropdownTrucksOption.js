import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../../customHooks/useGetItem'
import './dropdown_trucks_option.scss'

const DropdownDeckOption = ( props ) => {

    const { setAppState } = useContext( ShopContext )
    const { updateItem } = useGetItem()

    const selectTrucksVariant = async( value ) => {
        const width = await getSelectedOption( 'width' )
        const height = await getSelectedOption( 'height' )
        setAppState( prevState => {
            return { ...prevState, optionMenu: { open: false, productTitle: '', option: '' }}
        })
        switch ( props.option.name ) {
            case 'width':
                const updatedWidthProduct = await updateItem( props.productAPI, value )
                props.setProduct( updatedWidthProduct )
                break
            case 'height':
                const updatedHeightProduct = await updateItem( props.productAPI, width, value )
                props.setProduct( updatedHeightProduct )
                break
            case 'color':
                const updatedColorProduct = await updateItem( props.productAPI, width, height, value )
                props.setProduct( updatedColorProduct )
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
        <div className={ 'dropdown_trucks_option_container ' + ( props.dropdownOpen ? 'dropdown_open ' : '' ) }>
            { props.option.values.map( ( variant, index ) => {
                return <div 
                    key={ index }
                    className='variant_container' 
                    onClick={ () => selectTrucksVariant( variant ) }>
                    <h3 className={ variant === props.selectedVariant ? 'selected_variant ' : '' }>
                    { capitalFirst( variant ) }</h3>
                </div>
            }) }
        </div>
    )
}

export default DropdownDeckOption