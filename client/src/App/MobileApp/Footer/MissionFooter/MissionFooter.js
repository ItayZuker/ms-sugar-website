import React from 'react'
import './mission_footer.scss'

const MissionFooter = () => {

    return (
        <div className='mission_footer_container'>
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
                <i className="fab fa-facebook-square"></i>            
            </a>
            <a  rel="noreferrer"
                href="https://www.youtube.com/channel/UC8hV-7QTBwNbOuV2i4dxIHg" target="_blank">
                <i className="fab fa-youtube"></i>            
            </a>
        </div>
    )
}

export default MissionFooter