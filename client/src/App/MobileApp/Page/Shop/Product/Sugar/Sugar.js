import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../../../../../../Context/shopContext'
import { useGetItem } from '../../../../../../customHooks/useGetItem'
import './sugar.scss'

const Sugar = () => {

    const [ currentIndex, setCurrentIndex ] = useState( 0 )
    const [ price, setPrice ] = useState()
    const [ allSugars, setAllSugars ] = useState()
    const { collections } = useContext( ShopContext )
    const [ product, setProduct ] = useState()
    const { updateItem } = useGetItem()
    const [ stockNotification, setstockNotification ] = useState()
    const { currencyData, addItemToCheckout, getPrice, appState } = useContext( ShopContext )
    const description_ref = useRef()

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


    useEffect(() => {
        const updateSugar = async () => {
            const allSugars = await getCollection()
            setAllSugars( allSugars )
            const currentSugarAPI = allSugars[0]
            const data = await getProduct( currentSugarAPI )
            const price = await getPrice( data )
            setPrice( price )
            setProduct( data )
        }
        updateSugar()
    }, [])

    useEffect(() => {
        if ( appState.language === 'english' ) {
            setstockNotification( 'Out of stock' )
        } else {
            setstockNotification( 'נגמר המלאי' )
        }
    }, [ appState.language ])

    useEffect( () => {
        if ( product ) {
            const fetchData = async () => {
                const price = await getPrice( product )
                setPrice( price )
            }
            fetchData()
        }
    }, [ getPrice ])

    const getCollection = () => {
        return new Promise( resolve => {
            const sugarsCollectionItem = collections.filter( collection => {
                return collection.title === 'sugar'
            })
            resolve( sugarsCollectionItem[0].products )
        })
    }

    const getCurrentSugar = ( allSugars ) => {
        return new Promise( resolve => {
            const currentSugar = allSugars.find( ( sugar, index ) => {
                // if ( sugar.id === id ) {
                    setCurrentIndex( index )
                    return sugar
                // }
            })
            resolve( currentSugar )
        })
    }

    const getProduct = ( selectedSugarAPI ) => {
        return new Promise( resolve => {
            const data = updateItem( selectedSugarAPI )
            resolve( data )
        } )
    }

    useEffect(() => {
        if( product ) {
            appState.language === 'english' ? description_ref.current.innerHTML = product.description : description_ref.current.innerHTML = sugarOne

        }
    }, [ product, appState.language ])


    useEffect(() => {
        if ( allSugars ) {
            const changeDeck = async () => {
                const currentSugarAPI = await allSugars.find( ( sugar, index ) => index === currentIndex )
                const data = await getProduct( currentSugarAPI )
                setProduct( data )
            }
            changeDeck()
        }
    }, [ currentIndex ])

    const addToCart = (e) => {
        e.preventDefault()
        if ( product.variant ) {
            addItemToCheckout( product.variant[ 0 ].id, 1 )
        }
    }

    const capitalFirst = ( string ) => {
        if ( string ) {
            return string.replace(/^./, string[0].toUpperCase());
        }
    }

    const changeSelection = async ( side ) => {
        if ( side === 'right' ) {
            if ( currentIndex === allSugars.length - 1 ) {
                setCurrentIndex( 0 )
            } else {
                setCurrentIndex( prevState => prevState += 1 )
            }
        } else {
            if ( currentIndex === 0 ) {
                setCurrentIndex( allSugars.length - 1 )
            } else {
                setCurrentIndex( prevState => prevState -= 1 )
            }
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
        <div className='sugar_container'>
            <div className='sugar_item'>
                <div className='gallery_container'>
                    <i 
                        className={ "fas fa-chevron-left " + ( allSugars.length > 1 ? '' : 'hide ') }
                        onClick={ () => changeSelection( 'left' ) }></i>
                    <div className='img_container'>
                        <img src={ product.images[0].src }/>
                    </div>
                    <i 
                        className={ "fas fa-chevron-right " + ( allSugars.length > 1 ? '' : 'hide ' ) }
                        onClick={ () => changeSelection( 'right' ) }></i>
                </div>
                <div className='selection_container'>
                    <h3>
                        { appState.language === 'english' ? capitalFirst( product.title ) : translateTitle( product.title ) }
                    </h3>
                    <h4 className={ 'price ' + ( product.variant ? '' : 'out_of_stock ' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                        { product.variant ? currencyData.currentCurrencySymbole + ' ' + price : stockNotification }
                    </h4>
                    <div className='product_description'>
                        <p ref={ description_ref }></p>
                    </div>
                    <button
                        className={ product.variant ? 'active' : '' } 
                        onClick={ e => addToCart( e ) }>
                        { appState.language === 'english' ? 'Add to cart' : 'להוסיף לעגלה' }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sugar