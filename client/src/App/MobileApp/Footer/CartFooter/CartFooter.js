import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import LanguageButton from './LanguageButton/LanguageButton'
import { ShopContext } from '../../../../Context/shopContext'
import './cart_footer.scss'

const CartFooter = () => {

    const { checkout, setAppState, appState } = useContext( ShopContext )

    const history = useHistory()

    const goTo = ( page ) => {
        console.log('123')
        history.push( `/${ page }` )
        setAppState( prevState => {
            return { ...prevState, page: page }
        })
    }


    if ( !checkout.lineItems ) return <h4 onClick={ () => { goTo( 'shop' )} }
    >Shop <i className="fas fa-store"></i></h4>

    return (
        <div className='cart_footer_container'>
            <LanguageButton />
            <h4
                onClick={ () => { goTo( 'shop' )} }>
                    { appState.language === 'english' ? 'Shop' : 'חנות' } <i className="fas fa-store"></i>
            </h4>
        </div>
    )
}

export default CartFooter