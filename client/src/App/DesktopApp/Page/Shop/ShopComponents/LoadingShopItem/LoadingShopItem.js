import React, { useContext } from 'react'
import { ShopContext } from '../../../../../../Context/shopContext'
import './loading_shop_item.scss'

const LoadingShopItem = () => {

    const { appState } = useContext( ShopContext )

    return (
        <div className='loading_shop_item_container'>
            <h3>{ appState.language === 'english' ? 'Laoding...' : 'טוען...' }</h3>
        </div>
    )
}

export default LoadingShopItem