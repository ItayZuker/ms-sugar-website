import React, { useState } from 'react'
import PictureForm from './PictureForm/PictureForm'
import TextForm from './TextForm/TextForm'
import './discount_form.scss'

const DiscountForm = () => {

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
                    onClick={ e => selectArtForm( e, 'picture' ) }>Visual</button>
                <button 
                    className={ selectedArt === 'text' ? 'selected' : '' }
                    onClick={ e => selectArtForm( e, 'text' ) }>Text</button>
            </div>
            { selectedArt === 'picture' ? <PictureForm /> : <TextForm /> }
        </div>
    )
}

export default DiscountForm