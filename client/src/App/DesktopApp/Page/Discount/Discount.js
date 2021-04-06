import React, { useContext, useEffect, useState } from 'react'
import PictureForm from './PictureForm/PictureForm'
import TextForm from './TextForm/TextForm'
import './discount.scss'
import { ShopContext } from '../../../../Context/shopContext'

const Discount = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const [ selectedArt, setSelectedArt ] = useState( 'picture' )
    const { setAppState, appState } = useContext( ShopContext )
    const [ pictureText, setPictureText ] = useState()
    const [ textText, setTextText ] = useState()

    useEffect(() => {
        appState.language === 'english' ? setLenguage( 'english' ) : setLenguage( 'hebrew' )
    }, [ appState.language ])

    const setLenguage = ( language ) => {
        if ( language === 'english' ) {
            setPictureText( `
                Send us a visual you made, and you will get a 10% discount coupon. 
                It can be a sketch, a picture, a drawing, a painting or any other visual you made. 
                As long as you'r the artist, you can send us anything.
            ` )
            setTextText( `
                Send us a poem, a short story or a thought you've written down, 
                and you will get a 10% discount coupon.
                Give your mind a place to be. 
                Anything you write is great.
            ` )
        } else {
            setPictureText( `
                שילחו לנו תמונה של יצירת אומנות שעשיתם,
                ותקבלו קופון הנחה של 10% לשימוש חד-פעמי.
                זה יכול להיות סתם שירבוט מעניין במחברת, תמונה שצלמתם, רישום, ציור או כל דבר אחר.
                כל עוד אתם היוצרים, אפשר לשלוח כל דבר.
            ` )
            setTextText( `
                שילחו לנו שיר שכתבתם, סיפור קצר או מחשבה מעניינת,
                ותקבלו קופון הנחה של 10% לשימוש חד-פעמי.
                תנו במה למילים שכתבתם. אתם יכולים לשלוח כל קטע שכתבתם ואתם רוצים לשתף. 
            ` )
        }
    }

    useEffect(() => {
        setLoadComponent( true )
        setAppState( prevState => {
            return { ...prevState, page: 'discount' }
        })
    }, [])

    const selectArtForm = ( e, selection ) => {
        e.preventDefault()
        selection === 'picture' ? setSelectedArt( 'picture' ) : setSelectedArt( 'text' )
    }

    return (
        <div className={ 'desktop_discount_container ' + ( loadComponent ? 'load_component ' : '' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
            <h3 className={ appState.language === 'english' ? '' : 'hebrew' }>
                { appState.language === 'english' ? '10% Discount' : '10% הנחה' }</h3>
            <div className='main_discount_section'>
                <div className='buttons_section'>
                    <div className='buttons_container'>
                        <button 
                            className={ selectedArt === 'picture' ? 'selected' : '' }
                            onClick={ e => selectArtForm( e, 'picture' ) }>
                            { appState.language === 'english' ? 'Visual' : "תמונה" }
                        </button>
                        <button 
                            className={ selectedArt === 'text' ? 'selected' : '' }
                            onClick={ e => selectArtForm( e, 'text' ) }>
                                { appState.language === 'english' ? 'Text' : 'טקסט' }
                            </button>
                    </div>
                    <p className={ appState.language === 'english' ? '' : 'hebrew' }>
                        { selectedArt === 'picture' ? pictureText : textText }</p>
                </div>
                { selectedArt === 'picture' ? <PictureForm /> : <TextForm /> }
            </div>
        </div>
    )
}

export default Discount