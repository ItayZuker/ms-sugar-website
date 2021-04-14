import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import ShopMenu from './ShopMenu/ShopMenu'
import Product from './Product/Product'
import { ShopContext } from '../../../../Context/shopContext'
import './shop.scss'

const Shop = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const { fetchAllCollections, setAppState, appState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setLoadComponent(true)
        fetchAllCollections()
        setAppState( prevState => {
            return { ...prevState, page: 'shop' }
        })
    }, [])

    return (
        <div className={ 'desktop_shop_container ' + ( loadComponent ? 'load_component ' : '' ) + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
                <ShopMenu />
                <Switch>
                    <Route path='/shop' exact component={ Product }/>
                    <Route path='/shop/:product' exact component={ Product }/>
                    <Route path='/shop/:product/:id' exact component={ Product }/>
                </Switch>
        </div>
    )
}

export default Shop