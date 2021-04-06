import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './loading_coupon.scss'

const LoadingCoupon = () => {

    const { appState } = useContext( ShopContext )

    useEffect(() => {
        loading()
    }, [])

    const loading = () => {
    let HTMLItem = document.getElementById('loading_coupon');
    HTMLItem.classList.add('bright')
        setInterval( () => {
            if (HTMLItem.classList.contains('bright')) {
                HTMLItem.classList.remove('bright')
            } else {
                HTMLItem.classList.add('bright')
            }
        }, 1000);
    }

    return (
        <div className='desktop_loading_coupon_container'>
            <h3 id='loading_coupon'>{ appState.language === 'english' ? 'Sending Coupon' : 'שולח קופון'}</h3>
        </div>
    )
}

export default LoadingCoupon