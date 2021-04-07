import React from 'react'
import './discount_footer.scss'

const DiscountFooter = () => {

    return (
        <div className='discount_footer_container'>
            <a href="https://twitter.com/Sugar_Skateshop" target="_blank">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/ms_sugar_skateshop/" target="_blank">
                <i className="fab fa-instagram"></i>        
            </a>
            <a href="https://www.facebook.com/mssugarskateshop" target="_blank">
                <i class="fab fa-facebook-square"></i>            
            </a>
            <a href="https://www.youtube.com/channel/UC8hV-7QTBwNbOuV2i4dxIHg" target="_blank">
                <i class="fab fa-youtube"></i>            
            </a>
        </div>
    )
}

export default DiscountFooter