import React, { useContext, useEffect } from 'react'
import { BrowserView, MobileView } from "react-device-detect";
import { ShopContext } from '../Context/shopContext';
import DesktopApp from './DesktopApp/DesktopApp'
import MobileApp from './MobileApp/MobileApp'

const App = () => {

  const { setClientInfo, setCurrency, currencyData } = useContext( ShopContext)

  useEffect(() => {
    setCurrency()
    const fetchData = async () => {
      const data = await   fetch(`https://geolocation-db.com/json/`)
      const geoData = await data.json()
      setClientInfo( () => {
        return {
          countyCode: geoData.country_code, 
          countryName: geoData.country_name
        } 
      })
    }
    fetchData()
  }, [])

  return (
    <>
      <BrowserView>
        <DesktopApp />
      </BrowserView>
      <MobileView>
        <MobileApp />
      </MobileView>
    </>
  )
}

export default App;
