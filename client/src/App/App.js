import React, { useContext, useEffect } from 'react'
import { BrowserView, MobileView } from "react-device-detect";
import { ShopContext } from '../Context/shopContext';
import DesktopApp from './DesktopApp/DesktopApp'
import MobileApp from './MobileApp/MobileApp'

const App = () => {

  const { setClientInfo, setCurrency, changeCurrency, setAppState } = useContext( ShopContext)

  useEffect(() => {
    const fetchData = async () => {
      const data = await   fetch(`https://geolocation-db.com/json/`)
      const geoData = await data.json()
      selectCurrency( geoData )
      selectLanguage( geoData )
      setClientInfo( () => {
        return {
          countyCode: geoData.country_code, 
          countryName: geoData.country_name
        } 
      })
    }
    fetchData()
  }, [])

  const selectCurrency = async ( geoData ) => {
    if ( geoData.country_code === 'IL' ) {
      await setCurrency()
      changeCurrency( 'ILS' )
      console.log(geoData.country_code)
    } else {
      setCurrency()
    }
  }

  const selectLanguage = ( geoData ) => {
    if ( geoData.country_code === 'IL' ) {
      setAppState( prevState => {
        return { ...prevState, language: 'hebrew' }
      })
    } else {
      setAppState( prevState => {
        return { ...prevState, language: 'english' }
      })
    }
  }

  return (
    <>
      <BrowserView>
        {/* <DesktopApp /> */}
        <MobileApp />
      </BrowserView>
      <MobileView>
      </MobileView>
    </>
  )
}

export default App;
