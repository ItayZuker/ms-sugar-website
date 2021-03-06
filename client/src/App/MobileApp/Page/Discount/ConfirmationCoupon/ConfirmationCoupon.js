import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../Context/shopContext'
import './confirmation_coupon.scss'

const ConfirmationCoupon = () => {

    const { setAppState, appState } = useContext( ShopContext )
    const history = useHistory()

    const selectPage = (page) => {
        setAppState(prevState => {
            return { ...prevState,
                mainMenu: { open: false }, 
                loading: { active: false },
                page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <div className='confirmation_coupon_container'>
            <h3><i className="far fa-smile"></i></h3>
            <h3>{ appState.language === 'english' ? 'Coupon Sent' : 'הקופון נשלח' }</h3>
            <h4 onClick={ () => selectPage( 'shop' ) }>
                { appState.language === 'english' ? 'Go to Shop ' : ' כניסה לחנות' }
                { appState.language === 'english' ? <i className="fas fa-chevron-right"></i> : <i className="fas fa-chevron-left hebrew"></i> } 
            </h4>
        </div>
    )
}

export default ConfirmationCoupon