import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../../../customHooks/useGetItem'
import './dropdown_grip_option.scss'

const DropdownGripOption = ( props ) => {

    const { setAppState, appState } = useContext( ShopContext )
    const { updateItem } = useGetItem()

    const selectGripVariant = async( value ) => {
        const size = await getSelectedOption( 'size' )
        setAppState( prevState => {
            return { ...prevState, optionMenu: { open: false, productTitle: '', option: '' }}
        })
        switch ( props.option.name ) {
            case 'size':
                const updatedSizeProduct = await updateItem( props.productAPI, value )
                props.setProduct( updatedSizeProduct )
                break
            case 'technology':
                const updatedTechnologyProduct = await updateItem( props.productAPI, size, value )
                props.setProduct( updatedTechnologyProduct )
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

    const translateValue = ( value ) => {
        switch ( value ) {
            case 'pro': return 'מקצועי'
            case 'standard': return 'רגיל'
            default: return value
        }
    }

    return (
        <div className={ 'dropdown_grip_option_container ' + ( props.dropdownOpen ? 'dropdown_open ' : '' ) }>
            { props.option.values.map( ( variant, index ) => {
                return <div 
                    key={ index }
                    className={ 'variant_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) } 
                    onClick={ () => selectGripVariant( variant ) }>
                    <h3 className={ variant === props.selectedVariant ? 'selected_variant ' : '' }>
                    { appState.language === 'english' ? capitalFirst( variant ) : translateValue( variant ) }
                    </h3>
                </div>
            }) }
        </div>
    )
}

export default DropdownGripOption