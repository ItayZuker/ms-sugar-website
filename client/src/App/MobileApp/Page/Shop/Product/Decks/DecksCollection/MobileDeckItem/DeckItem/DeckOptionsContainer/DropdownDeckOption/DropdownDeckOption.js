import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../../../customHooks/useGetItem'
import './dropdown_deck_option.scss'

const DropdownDeckOption = ( props ) => {

    const { setAppState } = useContext( ShopContext )
    const { updateItem } = useGetItem()

    const selectDeckVariant = async( value ) => {
        const size = await getSelectedOption( 'size' )
        const concave = await getSelectedOption( 'concave' )
        setAppState( prevState => {
            return { ...prevState, optionMenu: { open: false, productTitle: '', option: '' }}
        })
        switch ( props.option.name ) {
            case 'size':
                const updatedSizeProduct = await updateItem( props.productAPI, value )
                props.setProduct( updatedSizeProduct )
                break
            case 'concave':
                const updatedConcaveProduct = await updateItem( props.productAPI, size, value )
                props.setProduct( updatedConcaveProduct )
                break
            case 'material':
                const updatedMaterialProduct = await updateItem( props.productAPI, size, concave, value )
                props.setProduct( updatedMaterialProduct )
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
        <div className={ 'dropdown_deck_option_container ' + ( props.dropdownOpen ? 'dropdown_open ' : '' ) }>
            { props.option.values.map( ( variant, index ) => {
                return <div 
                    key={ index }
                    className='variant_container' 
                    onClick={ () => selectDeckVariant( variant ) }>
                    <h3 className={ variant === props.selectedVariant ? 'selected_variant ' : '' }>
                    { capitalFirst( variant ) }</h3>
                </div>
            }) }
        </div>
    )
}

export default DropdownDeckOption