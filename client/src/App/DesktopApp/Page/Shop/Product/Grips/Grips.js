import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PreviewGripsGallery from './PreviewGripsGallery/PreviewGripsGallery'
import GripItemGallery from './GripItemGallery/GripItemGallery'
import { ShopContext } from '../../../../../../Context/shopContext'
import './grips.scss'

const Grips = () => {

    const { setAppState } = useContext( ShopContext )
    const { id } = useParams()

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'grips' }
        })
    }, [])


    return (
        <div className='desktop_grips_container'>
            { id ? <GripItemGallery /> : <PreviewGripsGallery /> }
        </div>
    )
}

export default Grips