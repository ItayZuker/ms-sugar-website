import React, { useContext, useState } from 'react'
import PictureForm from './PictureForm/PictureForm'
import TextForm from './TextForm/TextForm'
import './discount_form.scss'
import { ShopContext } from '../../../../../Context/shopContext'

const DiscountForm = () => {

    const { appState } = useContext( ShopContext )
    const [ selectedArt, setSelectedArt ] = useState( 'picture' )

    const selectArtForm = ( e, selection ) => {
        e.preventDefault()
        selection === 'picture' ? setSelectedArt( 'picture' ) : setSelectedArt( 'text' )
    }

    return (
        <div className='discount_form_container'>
            <div className='buttons_container'>
                <button 
                    className={ selectedArt === 'picture' ? 'selected' : '' }
                    onClick={ e => selectArtForm( e, 'picture' ) }>
                        { appState.language === 'english' ? 'Visual' : 'תמונה' }
                </button>
                <button 
                    className={ selectedArt === 'text' ? 'selected' : '' }
                    onClick={ e => selectArtForm( e, 'text' ) }>
                        { appState.language === 'english' ? 'Text' : 'טקסט' }
                </button>
            </div>
            { selectedArt === 'picture' ? <PictureForm /> : <TextForm /> }
        </div>
    )
}

export default DiscountForm