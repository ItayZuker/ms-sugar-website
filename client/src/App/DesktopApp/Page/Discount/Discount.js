import React, { useContext, useEffect, useState } from 'react'
import PictureForm from './PictureForm/PictureForm'
import TextForm from './TextForm/TextForm'
import './discount.scss'
import { ShopContext } from '../../../../Context/shopContext'

const Discount = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const [ selectedArt, setSelectedArt ] = useState( 'picture' )
    const { setAppState } = useContext( ShopContext )
    const [ pictureText ] = useState( 
        `Send us a visual you made, and you will get a 10% discount coupon. 
        It can be a sketch, a picture, a drawing, a painting or any other visual you made. 
        As long as you'r the artist, you can send us anything.` )
    const [ textText ] = useState( 
        `Send us a poem, a short story or a thought you've written down, 
        and you will get a 10% discount coupon.
        Give your mind a place to be. 
        Anything you write is great.` )

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
        <div className={ 'desktop_discount_container ' + ( loadComponent ? 'load_component' : '' ) }>
            <h3>10% Discount</h3>
            <div className='main_discount_section'>
                <div className='buttons_section'>
                    <div className='buttons_container'>
                        <button 
                            className={ selectedArt === 'picture' ? 'selected' : '' }
                            onClick={ e => selectArtForm( e, 'picture' ) }>Visual</button>
                        <button 
                            className={ selectedArt === 'text' ? 'selected' : '' }
                            onClick={ e => selectArtForm( e, 'text' ) }>Text</button>
                    </div>
                    <p>{ selectedArt === 'picture' ? pictureText : textText }</p>
                </div>
                { selectedArt === 'picture' ? <PictureForm /> : <TextForm /> }
            </div>
        </div>
    )
}

export default Discount