import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Decks from './Decks/Decks'
import Trucks from './Trucks/Trucks'
import Wheels from './Wheels/Wheels'
import Bearings from './Bearings/Bearings'
import Grips from './Grips/Grips'
import Extra from './Extra/Extra'
import Sugar from './Sugar/Sugar'
import { ShopContext } from '../../../../../Context/shopContext'
import './product.scss'

const Product = () => {

    const { product } = useParams()
    const { setAppState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector( 'html' )
        html.scrollTop = 0
        
        setAppState( prevState => {
            return { ...prevState, loading: { active: false } }
        })
    }, [])

    return (
        <div className='product_container'>
            { product === undefined ?  <Decks /> : null }
            { product === 'decks' ? <Decks /> : null }
            { product === 'trucks' ? <Trucks /> : null }
            { product === 'wheels' ? <Wheels /> : null }
            { product === 'bearings' ? <Bearings /> : null }
            { product === 'grips' ? <Grips /> : null }
            { product === 'extra' ? <Extra /> : null }
            { product === 'sugar' ? <Sugar /> : null }
        </div>
    )
}

export default Product