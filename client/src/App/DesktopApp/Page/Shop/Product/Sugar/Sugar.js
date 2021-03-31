import React, { useContext, useEffect } from 'react'
import SugarItemGallery from './SugarItemGallery/SugarItemGallery'
import './sugar.scss'
import { ShopContext } from '../../../../../../Context/shopContext'

const Sugar = () => {

    const { setAppState } = useContext( ShopContext )

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, currentProductType: 'sugar' }
        })
    }, [])

    return (
        <div className='desktop_sugar_container'>
            <SugarItemGallery />
        </div>
    )
}

export default Sugar