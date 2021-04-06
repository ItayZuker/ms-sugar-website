import React, { useContext, useEffect, useState, useRef } from 'react'
import ExtraOptionsContainer from './ExtraOptionsContainer/ExtraOptionsContainer'
import { useGetItem } from '../../../../../../../customHooks/useGetItem'
import { ShopContext } from '../../../../../../../Context/shopContext'
import './mobile_extra_item.scss'

const MobileDeckItem = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setStockNotification ] = useState()
    const { addItemToCheckout, currencyData, getPrice, appState } = useContext( ShopContext)
    const description_ref = useRef()
    const [ stencil ] = useState( () => {
        return `<p>
                <span>
                    אפשר לעשות גרפיטי עם הסטנסיל של "מיס שוגר",
                    אבל ברוב המקומות זה לא חוקי.
                    </span>
                </p>`
        })
    
    useEffect(() => {
        getProduct()
    }, [])

    useEffect(() => {
        if ( appState.language === 'english' ) {
            setStockNotification( 'Out of stock' )
        } else {
            setStockNotification( 'נגמר המלאי' )
        }
    }, [ appState.language ])

    const getProduct = async() => {
        const data = await updateItem( props.product )
        const price = await getPrice( data )
        setPrice( price )
        setProduct( data )
    }

    useEffect( () => {
        if ( product ) {
            const fetchData = async () => {
                const price = await getPrice( product )
                setPrice( price )
            }
            fetchData()
        }
    }, [ getPrice ])

    useEffect(() => {
        if( product ) {
            appState.language === 'english' ? description_ref.current.innerHTML = product.description : description_ref.current.innerHTML = stencil
        }
    }, [ product, appState.language ])

    const addToCart = (e) => {
        e.preventDefault()
        if ( product.variant ) {
            addItemToCheckout( product.variant[0].id, 1 )
        }
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    if ( !product ) return <></>

    return (
        <div className='mobile_extra_item_container'>
            <div className='image_container'>
                <img 
                    src={ product.variant ? product.variant[0].image.src : product.images[0].src }
                    alt='product' />
            </div>
            <div className='selection_container'>
                <h3>
                    { appState.language === 'english' ? capitalFirst( product.title ) : 'סטנסיל' }
                </h3>
                <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock ' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                    { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                </h4>
                <div className='product_description'>
                    <p ref={ description_ref }></p>
                </div>
                <div className='options_container'>
                    { product.options.map( option => {
                        return <ExtraOptionsContainer
                            key={ option.name }
                            option={ option }
                            product={ product }
                            productAPI={ props.product }
                            setProduct={ setProduct } />
                    }) }
                </div>
                <button
                    className={ product.variant ? 'active' : '' } 
                    onClick={ e => addToCart(e) }>
                        { appState.language === 'english' ? 'Add to cart' : 'להוסיף לעגלה' }
                    </button>
            </div>
        </div>
    )
}

export default MobileDeckItem