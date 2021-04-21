import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from './Header/Header'
import Page from './Page/page'
import Footer from './Footer/Footer'
import { ShopContext } from '../../Context/shopContext'
import './desktop_app.scss'

const DesktopApp = () => {

  const { currencyData } = useContext( ShopContext )

  if ( !currencyData.currentCurrencyCode ) return <></>


  return (
      <div className='desktop_app_container'>
          <Header />
          <Switch>
            <Route path='/' exact component={ Page } />
            <Route path='/:page' component={ Page } />
          </Switch>
          <Footer />
      </div>
  )
}

export default DesktopApp;
