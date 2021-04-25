import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../../customHooks/useGetItem'
import './option.scss'

const Option = ( props ) => {

    const { appState, setAppState } = useContext( ShopContext )
    const [ selectedVariant, setSelectedVariant ] = useState()
    const { updateItem } = useGetItem()

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

    const selectDeckVariant = async( value ) => {
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

    const translateValue = ( value ) => {
        switch ( value ) {
            case 'white': return 'לבן'
            case 'black': return 'שחור'
            default: return value
        }
    }

    const translateOptionName = ( name ) => {
        switch ( name ) {
            case 'size': return 'מידה'
            case 'color': return 'צבע'
            case 'density': return 'צפיפות'
            default: return name
        }
    }

    return (
        <div className={ 'mobile_option_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            <h4>{ appState.language === 'english' ? capitalFirst( props.option.name ) : translateOptionName( props.option.name ) }:</h4>
            <div className={ 'option_values_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
                { props.option.values.map( ( value, index ) => {
                    return (
                        <div
                            key={ value } 
                            className='value_container'>
                            <h4 
                            className={ selectedVariant === value ? 'selected' : '' }
                            onClick={ () => selectDeckVariant( value ) }> 
                            { appState.language === 'english' ? capitalFirst( value ) : translateValue( value ) } </h4>
                            { index === props.option.values.length - 1 ? '' : <span>/</span> }
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default Option