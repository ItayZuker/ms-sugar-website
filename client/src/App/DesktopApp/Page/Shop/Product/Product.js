import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Decks from './Decks/Decks'
import Grips from './Grips/Grips'
import Wheels from './Wheels/Wheels'
import Bearings from './Bearings/Bearings'
import Trucks from './Trucks/Trucks'
import Extra from './Extra/Extra'
import Sugar from './Sugar/Sugar'
// import { useSetCurrentProduct } from '../../../../customHooks/useSetCurrentProduct'
import './product.scss'

const Product = () => {

    const { product } = useParams()

    useEffect(() => {
        const html = document.querySelector( 'html' )
        html.scrollTop = 0
    }, [])

    return (
        <div className='desktop_product_container'>
            { product === undefined ?  <Decks /> : null }
            { product === 'decks' ? <Decks /> : null }
            { product === 'grips' ? <Grips /> : null }
            { product === 'wheels' ? <Wheels /> : null }
            { product === 'bearings' ? <Bearings /> : null }
            { product === 'trucks' ? <Trucks /> : null }
            { product === 'extra' ? <Extra /> : null }
            { product === 'sugar' ? <Sugar /> : null }
        </div>
    )
}

export default Product