import React, { useEffect, useContext, useState, useRef } from 'react'
import Options from './Options/Options'
import  './deck_data.scss'
import { ShopContext } from '../../../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../../../customHooks/useGetItem'

const DeckData = ( props ) => {

    const [ product, setProduct ] = useState()
    const [ price, setPrice ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setStockNotification ] = useState()
    const { currencyData, addItemToCheckout, getPrice, appState } = useContext( ShopContext )
    const deckInfo_ref = useRef()
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

    const [ deckOne ] = useState( () => {
        return `<p>
                <span>
                היא עולה כפטריה בין גבעולי הדשא. עולמה אפור, בהיר ונעלם. בין כל הפטריות אני נרדם.
                </span>
                <p>&nbsp;</p>
                <p>עיצוב: 'שוגר'</p>
                </p>`
            
        })
    const [ deckTwo ] = useState( () => {
        return `<p>
                <span>
                כמים הזורמים באדמה של המדבר, היום אתה הגשם ומחר תהיה נהר.
                </span>
                <p>&nbsp;</p>
                <p>עיצוב: 'שוגר'</p>
                </p>`
            
        })
    const [ deckThree ] = useState( () => {
        return `<p>
                <span>
                לפעמים חלליות מעופפות אל הדמיון, במציאות שכל אחד ממציא.
                אבל הנה מגיעות, והן לאט לאט עולות, והדמיון הופך להיות לאמיתי.
                </span>
                <p>&nbsp;</p>
                <p>עיצוב: 'שוגר'</p>
                </p>`
            
        })
    const [ deckFour ] = useState( () => {
        return `<p>
                <span>
                בשמש להבה רוקדת, ואז עפה בחלל.
                אם היא פוגעת בכדור הארץ, זה היה בכוונה?
                או שזה רק מזל?
                </span>
                <p>&nbsp;</p>
                <p>עיצוב: 'שוגר'</p>
                </p>`
            
        })
    const [ deckFive ] = useState( () => {
        return `<p>
                <span>
                אני חושב שעדיף לאבד את הדעת, כי בתוך התפוח תמיד יש תולעת.
                </span>
                <p>&nbsp;</p>
                <p>עיצוב: 'שוגר'</p>
                </p>`
            
        })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProduct()
            const price = await getPrice( data )
            setPrice( price )
            setProduct( data )
            // deckInfo_ref.current.innerHTML = data.description
            // appState.language === 'english' ? deckInfo_ref.current.innerHTML = data.description :  deckInfo_ref.current.innerHTML = translate( data )
            appState.language === 'english' ? setStockNotification( 'Out of stock' ) : setStockNotification( 'נגמר המלאי' )
        }
        fetchData()
    }, [ props.productAPI, appState.language ])

    const translate = ( data ) => {
        switch ( data.title ) {
            case 'deck #1': return deckOne
            case 'deck #2': return deckTwo
            case 'deck #3': return deckThree
            case 'deck #4': return deckFour
            case 'deck #5': return deckFive
            default: return data.title
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
            case 'deck #1': return 'קרש #1'
            case 'deck #2': return 'קרש #2'
            case 'deck #3': return 'קרש #3'
            case 'deck #4': return 'קרש #4'
            case 'deck #5': return 'קרש #5'
            default: return title
        }
    }

    if ( !product ) return <></>

    return (
        <div className={ 'mobile_deck_data_container ' + ( appState.language === 'english' ? '' : 'hebrew' ) }>
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
            <p ref={ deckInfo_ref }>
                { appState.language === 'english' ? deckInfoENG : deckInfoHEB }
            </p>
        </div>
    )
}

export default DeckData