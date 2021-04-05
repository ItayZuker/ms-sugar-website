import React, { useState, useEffect, useContext } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import './language_button.scss'

const LanguageButton = () => {

    const [ hideButton, setHideButton ] = useState( false )
    const { appState, setAppState } = useContext( ShopContext )

    useEffect(() => {
        if ( appState.mainMenu.open || appState.page === 'shop' || appState.page === 'cart'  ) {
            setHideButton( true )
        } else {
            setHideButton( false )
        }
    }, [ appState ])

    const selectLanguage = ( language ) => {
        setAppState( prevState => {
            return { ...prevState, language: language }
        })
    }
    
    return (
        <div className={ 'mobile_language_button_container ' + ( hideButton ? 'hide ' : '' ) }>
            <h3>
                <span 
                    className={ appState.language === 'english' ? '' : 'selected' }
                    onClick={ () => selectLanguage( 'hebrew' ) }>
                    עבר
                </span>
                {' / '}
                <span 
                    className={ appState.language === 'english' ? 'selected' : '' }
                    onClick={ () => selectLanguage( 'english' ) }>
                    ENG
                </span>
            </h3>
        </div>
    )
}

export default LanguageButton