import React, { useEffect, useContext, useState, useRef } from 'react'
import Options from './Options/Options'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'
import  './sugar_data.scss'

const SugarData = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const { currencyData, addItemToCheckout, getPrice, appState } = useContext( ShopContext )
    const [ stockNotification, setStockNotification ] = useState()
    const [ sugarOne ] = useState( () => {
        return `<p>
                <span>
                    הספר "שוגר #1" נכתב על ידי איתי צוקר.
                    איתי הוא היוצר של מותג הסקייטבורד "מיס שוגר", 
                    והספר הוא אוסף של שירים ואיורים שהוא כתב,
                    תוך כדי כתיבת הספר, התבשל הרעיון להקמת מותג הסקייטבורד "מיס שוגר" ובסוף המסע,
                    הבשיל הרעיון לנקודה שבא נמצא היום.
                </span>
                <p>&nbsp;</p>
                <p>דפים: 76</p>
                <p>עברית: 37</p>
                <p>אנגלית: 6</p>
                <p>איורים: 14</p>
                </p>`
            
        })
    const sugarInfo_ref = useRef()

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct()
            const price = await getPrice( data )
            setPrice( price )
            setProduct( data )
            appState.language === 'english' ? sugarInfo_ref.current.innerHTML = data.description :  sugarInfo_ref.current.innerHTML = translate( data )
            appState.language === 'english' ? setStockNotification( 'Out of stock' ) : setStockNotification( 'נגמר המלאי' )
        }
        fetchData()
    }, [ props.productAPI, appState.language ])

    const translate = ( data ) => {
        switch ( data.title ) {
            case 'sugar #1': return sugarOne
        }
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

    const getProduct = () => {
        return new Promise( resolve => {
            const data = updateItem( props.productAPI )
            resolve( data )
        } )
    }

    const addToCart = (e) => {
        e.preventDefault()
        addItemToCheckout( product.variant[0].id, 1 )
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    const translateTitle = ( title ) => {
        switch ( title ) {
            case 'sugar #1': return 'שוגר #1'
            default: return title
        }
    }


    if ( !product ) return <></>

    return (
        <div className='desktop_sugar_data_container'>
            <h3 className='title'>{ appState.language === 'english' ? capitalFirst( product.title ) : translateTitle( product.title ) }</h3>
            <h4 className={ 'price ' + ( props.productAPI.availableForSale ? 'active' : '' )}>
                { props.productAPI.availableForSale ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                </h4>
            <h3 className='inspiration_title'>
                { appState.language === 'english' ? 'Inspiration' : 'השראה' }</h3>
            <p ref={ sugarInfo_ref }></p>
            <div className='bottom_section'>
                { props.productAPI.availableForSale ? <Options product={ product } setProduct={ setProduct } productAPI={ props.productAPI } /> : null }
                <button 
                    className={ ( props.productAPI.availableForSale ? 'active ' : '' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) } 
                    onClick={ e => addToCart(e) }>{ appState.language === 'english' ? 'Add to cart' : 'להוסיף לעגלה' }</button>
            </div>
        </div>
    )
}

export default SugarData