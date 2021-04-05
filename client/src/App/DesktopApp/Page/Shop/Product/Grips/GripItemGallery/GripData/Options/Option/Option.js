import React, { useState, useEffect, useContext } from 'react'
import { useGetItem } from '../../../../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../../../../Context/shopContext'
import './option.scss'

const Option = ( props ) => {

    const [ selectedVariant, setSelectedVariant ] = useState()
    const { setAppState, appState } = useContext( ShopContext )
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

    const translate = ( optionName ) => {
        switch ( optionName ) {
            case 'size': return 'גודל'
            case 'technology': return 'טכנולוגיה'
        }
    }

    const translatValue = ( value ) => {
        switch ( value ) {
            case 'pro': return 'מקצועי'
            case 'standard': return 'רגיל'
            default: return value
        }
    }

    return (
        <div className='desktop_option_container'>
            <h4>{ appState.language === 'english' ? capitalFirst( props.option.name ) : translate( props.option.name ) }:</h4>
            <div className={ 'option_values_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                { props.option.values.map( ( value, index ) => {
                    return (
                        <div
                            key={ value } 
                            className='value_container'>
                            <h4 
                            className={ selectedVariant === value ? 'selected' : '' }
                            onClick={ () => selectGripVariant( value ) }> 
                            { appState.language === 'english' ? value : translatValue( value ) } </h4>
                            { index === props.option.values.length - 1 ? '' : <span>/</span> }
                        </div>
                    )
                }) }
            </div>
        </div>
    )
}

export default Option