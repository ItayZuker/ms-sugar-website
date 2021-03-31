import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../../../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../../../customHooks/useGetItem'
import './option.scss'

const Option = ( props ) => {

    const [ selectedVariant, setSelectedVariant ] = useState()
    const { setAppState } = useContext( ShopContext)
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
                        props.setVariant( updatedSizeProduct.variant )
                        break
                    case 'color':
                        const updatedColorProduct = await updateItem( props.productAPI, size, value )
                        props.setProduct( updatedColorProduct )
                        props.setVariant( updatedColorProduct.variant )
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
                        props.setVariant( updatedColorProduct.variant )
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
                        props.setVariant( updatedColorProduct.variant )
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
        <div className='desktop_option_container'>
            <h4>{ capitalFirst( props.option.name ) }:</h4>
            <div className='extra_option_values_container'>
                { props.option.values.map( ( value, index ) => {
                    return (
                        <div
                            key={ value } 
                            className='value_container'>
                            <h4 
                            className={ selectedVariant === value ? 'selected' : '' }
                            onClick={ () => selectExtraVariant( value ) }> 
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