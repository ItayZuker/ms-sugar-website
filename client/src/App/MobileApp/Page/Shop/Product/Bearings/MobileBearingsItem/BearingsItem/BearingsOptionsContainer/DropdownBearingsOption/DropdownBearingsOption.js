import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../../customHooks/useGetItem'
import './dropdown_bearings_option.scss'

const DropdownBearingsOption = ( props ) => {

    const { setAppState } = useContext( ShopContext )
    const { updateItem } = useGetItem()

    const selectBearingsVariant = async( value ) => {
        const abec = await getSelectedOption( 'abec' )
        setAppState( prevState => {
            return { ...prevState, optionMenu: { open: false, productTitle: '', option: '' }}
        })
        switch ( props.option.name ) {
            case 'abec':
                const updatedAbecProduct = await updateItem( props.productAPI, value )
                props.setProduct( updatedAbecProduct )
                break
            case 'color':
                const updatedColorProduct = await updateItem( props.productAPI, abec, value )
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
        <div className={ 'bearings_Option_container ' + ( props.dropdownOpen ? 'dropdown_open ' : '' ) }>
            { props.option.values.map( ( variant, index ) => {
                return <div 
                    key={ index }
                    className='variant_container' 
                    onClick={ () => selectBearingsVariant( variant ) }>
                    <h3 className={ variant === props.selectedVariant ? 'selected_variant ' : '' }>
                    { capitalFirst( variant ) }</h3>
                </div>
            }) }
        </div>
    )
}

export default DropdownBearingsOption