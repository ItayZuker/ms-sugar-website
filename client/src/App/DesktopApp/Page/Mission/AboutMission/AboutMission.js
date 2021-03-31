import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import ScrollableAnchor from 'react-scrollable-anchor'

import { ShopContext } from '../../../../../Context/shopContext'
import './about_mission.scss'

const AboutMission = () => {

    const { setAppState } = useContext( ShopContext )
    const history = useHistory()

    const goToShop = ( product ) => {
        setAppState( prevState => {
            return { ...prevState, 
                currentProductType: product, 
                productMenu: { open: false },
                page: 'shop'}
        })
        history.push( `/shop/${product}` )
    }

    const selectPage = ( page ) => {
        setAppState( prevState => {
            return { ...prevState,
                page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <ScrollableAnchor id={ 'mission_section' }>
        <div className='desktop_about_mission_container'>
            <div className='section_container'>
                <div className='title_container'>
                    <i className="far fa-heart"></i>
                    <h3>Mission</h3>
                </div>
                <p>
                    Ms. Sugar thinks that skaters are the most creative people on the planet,
                    and our mission is to celebrate this talent.
                    We publish skaters art on our social platform,
                    And we also publish on our Sugar skaters art collection.
                    Share your art and celebrate your talent.
                    We encourage you to join the Ms. Sugar mission.</p>
                <div className='button_container'>
                    <button onClick={ () => goToShop( '' ) }>Shop <i className="fas fa-caret-right"></i></button>
                </div>
            </div>
            <div className='section_container'>
                <div className='title_container'>
                    <i className="fas fa-percentage"></i>
                    <h3>Disscount</h3>
                </div>
                <p>
                    Use your creativity to make a work of art, 
                    and get a one time 10% discount for any purchase on the website.
                    You can send us anything you want. 
                    It can be a sketch, a poem or something else,
                    and you can also choose to be anonymous.
                    as long as you're the artist, you can send us anything.</p>
                <div className='button_container'>
                    <button onClick={ () => selectPage('discount') }>Discount <i className="fas fa-caret-right"></i></button>
                </div>
            </div>
            <div className='section_container'>
                <div className='title_container'>
                    <i className="fas fa-skull-crossbones"></i>
                    <h3>Sugar</h3>
                </div>
                <p>
                    Sugar is meant to be a collection book,
                    with skaters art from all around the world.
                    For now there's only one edition, with the art of Ms. Sugar creator: Itay Zuker.
                    In the future we will publish more and more editions,
                    with the art we get here on the website.
                    Feel free to check it out, if you are interested in skaters art.</p>
                <div className='button_container'>
                    <button onClick={ () => goToShop('sugar') }>Sugar <i className="fas fa-caret-right"></i></button>
                </div>
            </div>
        </div>
        </ScrollableAnchor>
    )
}

export default AboutMission