import React, { useContext, useEffect } from 'react'
import DiscountForm from './DiscountForm/DiscountForm'
import './discount.scss'
import { ShopContext } from '../../../../Context/shopContext'

const Discount = () => {

    const { setAppState, appState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setAppState( prevState => {
            return { ...prevState, page: 'discount' }
        })
    }, [])

    return (
        <div className={ 'discount_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
            <div className='title_container'>
                <h3>{ appState.language === 'english' ? '10% DISCOUNT' : '10% הנחה' }</h3>
            </div>
            <DiscountForm />
        </div>
    )
}

export default Discount