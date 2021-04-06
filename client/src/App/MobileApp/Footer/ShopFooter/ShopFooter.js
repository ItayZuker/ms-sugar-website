import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import LanguageButton from './LanguageButton/LanguageButton'
import { ShopContext } from '../../../../Context/shopContext'
import './shop_footer.scss'

const ShopFooter = () => {

    const history = useHistory()
    const { setAppState, itemsInCart } = useContext( ShopContext )

    const goTo = ( page ) => {
        history.push( `/${ page }` )
        setAppState( prevState => {
            return { ...prevState, page: page }
        })
    }

    return (
        <div className='shop_footer_container'>
            <LanguageButton />
            <h4 onClick={ () => { goTo( 'cart' )} }>
                ({ itemsInCart })<i className="fas fa-shopping-cart"></i>
            </h4>
        </div>
    )
}

export default ShopFooter