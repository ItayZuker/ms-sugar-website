import React, { useEffect } from 'react'
import './loading_shop.scss'

const LoadingShop = () => {

    useEffect(() => {
        loading()
    }, [])

    const loading = () => {
    let HTMLItem = document.getElementById('loading_shop');
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
        <div className='desktop_loading_shop_container'>
            <h3 id='loading_shop'>Loading Shop...</h3>
        </div>
    )
}

export default LoadingShop