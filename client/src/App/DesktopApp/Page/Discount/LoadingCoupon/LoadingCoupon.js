import React, { useEffect } from 'react'
import './loading_coupon.scss'

const LoadingCoupon = () => {

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
            <h3 id='loading_coupon'>Sending Coupon</h3>
        </div>
    )
}

export default LoadingCoupon