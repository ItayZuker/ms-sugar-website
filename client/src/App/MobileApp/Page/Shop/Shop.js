import React, { useContext, useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import ShopHeader from './ShopHeader/ShopHeader'
import Product from './Product/Product'
import LoadingShop from './ShopComponents/LoadingShop/LoadingShop'
import { ShopContext } from '../../../../Context/shopContext'
import './shop.scss'

const Shop = () => {

    const [ loadComponent, setLoadComponent ] = useState( false )
    const { fetchAllCollections, collections, setAppState } = useContext( ShopContext )

    useEffect(() => {
        const html = document.querySelector('html')
        html.scrollTop = 0
        setLoadComponent(true)
        fetchAllCollections()
        setAppState( prevState => {
            return { ...prevState, page: 'shop' }
        })
        return () => {
            
        }
    }, [])

    if ( !collections ) return <LoadingShop />

    return (
        <div className={ 'shop_container ' + (loadComponent ? 'load_component ' : '') }>
                <ShopHeader />
                <Switch>
                    <Route path='/shop' exact component={ Product }/>
                    <Route path='/shop/:product' exact component={ Product }/>
                    <Route path='/shop/:product/:id' exact component={ Product }/>
                </Switch>
        </div>
    )
}

export default Shop