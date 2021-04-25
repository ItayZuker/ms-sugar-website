import React, { useEffect, useContext, useState } from 'react'
import Options from './Options/Options'
import  './deck_data.scss'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'

const WheelData = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setStockNotification ] = useState()
    const { currencyData, addItemToCheckout, getPrice, appState } = useContext( ShopContext )
    const [ deckInfoENG ] = useState( () => {
        return `
                All the Ms. Sugar decks are manufactured at the highest quality available,
                and we alway try to give the lowest price we can.
                We also think that it's important that all decks will be inspiring and beautiful,
                and we try to make as many sizes as we can for each design.
            `
        })

    const [ deckInfoHEB ] = useState( () => {
        return `
                כל הקרשים של 'מיס שוגר' מיוצרים באיכות הגבוהה ביותר,
                ואנחנו מנסים לתת את המחיר הנמוך ביותר שאנחנו יכולים.
                בנוסף, העיצובים של הקרשים תמיד יהיו יפים ומעוררי השארה,
                וננסה לתת כמה שיותר מידות לכל עיצוב.
            `
        })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct()
            const price = await getPrice( data )
            setPrice( price )
            console.log(data)
            setProduct( data )
            appState.language === 'english' ? setStockNotification( 'Out of stock' ) : setStockNotification( 'נגמר המלאי' )
        }
        fetchData()
    }, [ props.productAPI, appState.language ])

    useEffect( () => {
        if ( product ) {
            const fetchData = async () => {
                const price = await getPrice( product )
                setPrice( price )
            }
            fetchData()
        }
    }, [ getPrice ])

    const getProduct = async() => {
        return new Promise( resolve => {
            const data = updateItem( props.productAPI )
            resolve( data )
        } )
    }

    const addToCart = (e) => {
        e.preventDefault()
        if ( props.productAPI.availableForSale ) {
            addItemToCheckout( product.variant[0].id, 1 )
        }
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    const translateTitle = ( title ) => {
        switch ( title ) {
            case 'wheels': return 'גלגלים'
            default: return title
        }
    }

    if ( !product ) return <></>

    return (
        <div className={ 'mobile_wheel_data_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
            <h3 className='title'>{ appState.language === 'english' ? capitalFirst( product.title ) : translateTitle( product.title ) }</h3>
            <h4 className={ 'price ' + ( props.productAPI.availableForSale ? 'active' : '' )}>
                { props.productAPI.availableForSale ? currencyData.currentCurrencySymbole + price : stockNotification }
                </h4>
            <div className='options_section'>
                { props.productAPI.availableForSale ? <Options product={ product } setProduct={ setProduct } productAPI={ props.productAPI } /> : null }
            </div>
            <button 
                    className={ props.productAPI.availableForSale ? 'active ' : ''  } 
                    onClick={ e => addToCart(e) }>{ appState.language === 'english' ? 'Add to cart' : 'להוסיף לעגלה' }</button>
            <h3 className='info_title'>{ appState.language === 'english' ? 'Info:' : 'פרטים:' }</h3>
            <p>
                { appState.language === 'english' ? deckInfoENG : deckInfoHEB }
            </p>
        </div>
    )
}

export default WheelData