import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import CurrenciesDropdownOptions from './CurrenciesDropdownOptions/CurrenciesDropdownOptions'
import './currency_dropdown.scss'

const CurrencyDropdown = () => {

    const [ hideCurrency, setHideCurrency ] = useState( true )
    const [ dropdownOpen, setDropdownOpen ] = useState( false )
    const { currencyData, appState } = useContext( ShopContext )

    const clickDropdown = () => {
        if ( dropdownOpen ) {
            setDropdownOpen( false )
        } else {
            setDropdownOpen( true )
        }
    }

    useEffect(() => {
        if ( appState.mainMenu.open  ) {
            setHideCurrency( true )
        } else if ( appState.page === 'cart' || appState.page === 'shop' ) {
            setHideCurrency( false )
        } else {
            setHideCurrency( true )
        }
    }, [ appState ])

    return (
        <div className={ 'mobile_currency_dropdown_container ' + ( hideCurrency ? 'hide ' : '' ) }>
            <div 
                tabIndex={ -1 }
                className={ 'mobile_selected_currency_container ' + ( dropdownOpen ? 'dropdown_open' : '' ) }
                onClick={ clickDropdown }
                onBlur={ () => setDropdownOpen( false ) }>
                <h3>{ currencyData.currentCurrencyCode }</h3>
                <h3>{ dropdownOpen ? <i className="fas fa-times"></i> : <i className="fas fa-caret-down"></i> }</h3>
            </div>
            <CurrenciesDropdownOptions dropdownOpen={ dropdownOpen } />
        </div>
    )
}

export default CurrencyDropdown