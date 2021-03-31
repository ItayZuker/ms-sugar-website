import React, { useContext } from 'react'
import { Route, Switch } from 'react-router-dom'
import MobileHeader from './Header/Header'
import Page from './Page/page'
import MobileFooter from './Footer/Footer'
import { ShopContext } from '../../Context/shopContext'
import './mobile_app.scss'

const MobileApp = () => {

  const { keyboardOpen } = useContext( ShopContext)

  return (
      <div className={ 'mobile_app_container ' + ( keyboardOpen ? 'keyboard_open ' : '' )}>
          <MobileHeader />
          <Switch>
            <Route path='/' exact component={ Page } />
            <Route path='/:page' component={ Page } />
          </Switch>
          <MobileFooter />
      </div>
  )
}

export default MobileApp;
