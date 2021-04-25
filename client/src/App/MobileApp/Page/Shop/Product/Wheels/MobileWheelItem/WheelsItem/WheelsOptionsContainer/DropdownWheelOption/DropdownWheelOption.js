import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../../customHooks/useGetItem'
import './dropdown_wheel_option.scss'

const DropdownWheelOption = ( props ) => {

    const { setAppState } = useContext( ShopContext )
    const { updateItem } = useGetItem()

    const selectWheelVariant = async( value ) => {
        const size = await getSelectedOption( 'size' )
        const color = await getSelectedOption( 'color' )
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
            case 'density':
                const updatedHaednessProduct = await updateItem( props.productAPI, size, color, value )
                props.setProduct( updatedHaednessProduct )
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
        <div className={ 'wheel_Option_container ' + ( props.dropdownOpen ? 'dropdown_open ' : '' ) }>
            { props.option.values.map( ( variant, index ) => {
                return <div 
                    key={ index }
                    className='variant_container' 
                    onClick={ () => selectWheelVariant( variant ) }>
                    <h3 className={ variant === props.selectedVariant ? 'selected_variant ' : '' }>
                    { capitalFirst( variant ) }</h3>
                </div>
            }) }
        </div>
    )
}

export default DropdownWheelOption