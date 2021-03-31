import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './loading_cart.scss'

const LoadingCart = () => {

    const { setAppState } = useContext( ShopContext )

    useEffect(() => {
        setAppState( prevState => {
            return { ...prevState, loading: { active: true }}
        })
    }, [])

    return (
        <div className='loading_cart_container'>
            <h3>Loading...</h3>
        </div>
    )
}

export default LoadingCart