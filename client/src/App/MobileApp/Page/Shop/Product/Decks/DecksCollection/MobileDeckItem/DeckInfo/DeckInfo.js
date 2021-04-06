import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../../../../../../../../../Context/shopContext'
import './deck_info.scss'

const DeckInfo = ( props ) => {

    const { appState } = useContext( ShopContext )
    const deckInfo_ref = useRef()

    const [ deckOne ] = useState( () => {
        return `<p>
                <span>
                כפטריה עולה בין גבעולי הדשא. עולמה אפור, בהיר ונעלם. בין כל הפטריות אני נרדם.
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
                אני עף בחללית מעל כל מה שמזויף, מותגים שמנסים להתחבב על המדף.
                אבל כל מה שחיקוי גם אם מאוד יצירתי, אף פעם לא קרוב להיות - סקייטר אמיתי.
                </span>
                <p>&nbsp;</p>
                <p>עיצוב: 'שוגר'</p>
                </p>`
            
        })
    const [ deckFour ] = useState( () => {
        return `<p>
                <span>
                אני שולח לך מסר בבקבוק, שגם את אתה קפטן הוק.
                הסקייטרים כפיטר-פן, כולם יודעים לעוף, ויום אחד יבוא והסירה כבר לא תצוף.
                כדאי לך ללמוד עכשיו לעוף.
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
        appState.language === 'english' ? deckInfo_ref.current.innerHTML = props.product.descriptionHtml :  deckInfo_ref.current.innerHTML = translate( props.product.title )
    }, [ appState.language ])

    const translate = ( title ) => {
        switch ( title ) {
            case 'deck #1': return deckOne
            case 'deck #2': return deckTwo
            case 'deck #3': return deckThree
            case 'deck #4': return deckFour
            case 'deck #5': return deckFive
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

    return (
        <div className={ 'deck_info_container ' + ( props.infoOpen ? '' : 'hide ' )}>
            <h3>
                { appState.language === 'english' ? 'Inspiration / ' : 'השראה / ' }
                
                { appState.language === 'english' ? capitalFirst( props.product.title ) : translateTitle( props.product.title ) }
            </h3>
            <br />
            <p ref={ deckInfo_ref }></p>
        </div>
    )
}

export default DeckInfo