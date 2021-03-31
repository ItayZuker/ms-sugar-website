import React, { useContext } from 'react'
import { ShopContext } from '../../../../../Context/shopContext'
import './currencies_dropdown_options.scss'

const CurrenciesDropdownOptions = ( props ) => {

    const { currencyData, changeCurrency } = useContext( ShopContext )

    const changeShopCurrency = ( currensyCode ) => {
        changeCurrency( currensyCode )
    }

    if ( !currencyData.currencyCodeList ) return <></>

    return (
        <div className={ 'currencies_dropdown_options_container ' + ( props.dropdownOpen ? 'dropdown_open ' : '' ) }>
            { currencyData.currencyCodeList.map( currensyCode => {
                return (
                    <div 
                        key={ currensyCode }
                        className='mobile_currency_container'
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

export default CurrenciesDropdownOptions