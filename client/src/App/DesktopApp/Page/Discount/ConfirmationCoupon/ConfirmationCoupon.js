import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../../../Context/shopContext'
import './confirmation_coupon.scss'

const ConfirmationCoupon = () => {

    const { setAppState } = useContext( ShopContext )
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
        <div className='desktop_confirmation_coupon_container'>
            <h3><i className="far fa-smile"></i></h3>
            <h3>Coupon Sent</h3>
            <h4 onClick={ () => selectPage( 'shop' ) }>Go to Shop <i className="fas fa-chevron-right"></i></h4>
        </div>
    )
}

export default ConfirmationCoupon