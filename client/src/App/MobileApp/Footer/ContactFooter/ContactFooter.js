import React, { useContext } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import './contact_footer.scss'

const ContactFooter = () => {

    const { keyboardOpen } = useContext( ShopContext )

    return (
        <div className={ 'contact_footer_container ' + ( keyboardOpen ? 'keyboard_open ' : '' )}>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
        </div>
    )
}

export default ContactFooter