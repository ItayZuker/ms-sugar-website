import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../../../../../../Context/shopContext'
import './loading_shop.scss'

const LoadingShop = () => {

    const { appState } = useContext( ShopContext )

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
        <div className='loading_shop_container'>
            <h3 id='loading_shop'>
            { appState.language === 'english' ? 'Loading Shop...' : 'החנות בטעינה...'}
            </h3>
        </div>
    )
}

export default LoadingShop