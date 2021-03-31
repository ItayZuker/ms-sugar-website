import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PreviewExtraGallery from './PreviewExtraGallery/PreviewExtraGallery'
import ExtraItemGallery from './ExtraItemGallery/ExtraItemGallery'
import './extra.scss'
import { ShopContext } from '../../../../../../Context/shopContext'

const Decks = () => {

    const { setAppState } = useContext( ShopContext )
    const { id } = useParams()

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'extra' }
        })
    }, [])


    return (
        <div className='desktop_decks_container'>
            { id ? <ExtraItemGallery /> : <PreviewExtraGallery /> }
        </div>
    )
}

export default Decks