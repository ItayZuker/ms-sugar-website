import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './currency_dropdown.scss'

const CurrencyDropdown = ( props ) => {

    const { currencyData, changeCurrency } = useContext( ShopContext )

    const changeShopCurrency = ( currensyCode ) => {
        changeCurrency( currensyCode )
    }
    
    console.log(currencyData.currencyCodeList)

    if ( !currencyData.currencyCodeList ) return <></>

    return (
        <div className={ 'test_desktop_currency_dropdown_container ' + ( props.openDropdownCurrency ? 'open ' : '' ) }>
            { currencyData.currencyCodeList.map( currensyCode => {
                return (
                    <div 
                        key={ currensyCode }
                        className='desktop_currency_container'
                        onClick={ () => changeShopCurrency( currensyCode )}>
                        <h3
                            className={ currencyData.currentCurrencyCode === currensyCode ? 'selected' : '' }
                            >{ currensyCode }</h3>
                    </div>
                )
            }) }
        </div>
    )
}

export default CurrencyDropdown