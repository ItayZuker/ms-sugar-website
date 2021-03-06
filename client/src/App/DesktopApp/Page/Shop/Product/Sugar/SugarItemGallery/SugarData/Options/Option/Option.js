import React, { useState, useEffect } from 'react'
import { useGetItem } from '../../../../../../../../../../customHooks/useGetItem'
import './option.scss'

const Option = ( props ) => {

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
        const concave = await getSelectedOption( 'concave' )
        switch ( props.option.name ) {
            case 'size':
                console.log( value )
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
        <div className='desktop_option_container'>
            <h4>{ capitalFirst( props.option.name ) }:</h4>
            <div className='option_values_container'>
                { props.option.values.map( ( value, index ) => {
                    return (
                        <div
                            key={ value } 
                            className='value_container'>
                            <h4 
                            className={ selectedVariant === value ? 'selected' : '' }
                            onClick={ () => selectDeckVariant( value ) }> 
                            { value } </h4>
                            { index === props.option.values.length - 1 ? '' : <span>/</span> }
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default Option