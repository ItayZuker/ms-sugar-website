import React, { useContext } from 'react'
import { ShopContext } from '../../../../Context/shopContext'
import './contact_footer.scss'

const ContactFooter = () => {

    const { keyboardOpen } = useContext( ShopContext )

    return (
        <div className={ 'contact_footer_container ' + ( keyboardOpen ? 'keyboard_open ' : '' )}>
            <a  rel="noreferrer"
                href="https://twitter.com/Sugar_Skateshop" target="_blank">
                <i className="fab fa-twitter"></i>
            </a>
            <a  rel="noreferrer"
                href="https://www.instagram.com/ms_sugar_skateshop/" target="_blank">
                <i className="fab fa-instagram"></i>        
            </a>
            <a  rel="noreferrer"
                href="https://www.facebook.com/mssugarskateshop" target="_blank">
                <i class="fab fa-facebook-square"></i>            
            </a>
            <a  rel="noreferrer"
                href="https://www.youtube.com/channel/UC8hV-7QTBwNbOuV2i4dxIHg" target="_blank">
                <i class="fab fa-youtube"></i>            
            </a>
        </div>
    )
}

export default ContactFooter