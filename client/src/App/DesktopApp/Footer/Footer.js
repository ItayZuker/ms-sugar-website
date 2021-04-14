import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ShopContext } from '../../../Context/shopContext'
import './footer.scss'

const Footer = () => {

    const { appState, setAppState, itemsInCart } = useContext( ShopContext )
    const history = useHistory()

    const selectPage = (page) => {
        setAppState(prevState => {
            return { ...prevState, page: page }
        })
        history.push(`/${page}`)
    }

    return (
        <div className={ 'desktop_footer_container ' + ( appState.language === 'english' ? '' : 'hebrew ' ) }>
            <div className='navbar_menu'>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('mission')}>
                    <h3>
                        <button
                            className={ appState.page === 'mission' ? 'selected' : '' }>
                            { appState.language === 'english' ? 'Mission' : 'משימה' }
                        </button>
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('shop')}>
                    <h3>
                        <button
                            className={ appState.page === 'shop' ? 'selected' : '' }>
                            <i className="fas fa-store"></i>
                            { appState.language === 'english' ? 'Shop' : 'חנות' }
                        </button>
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('discount')}>
                    <h3>
                        <button
                            className={ appState.page === 'discount' ? 'selected' : '' }>{
                            appState.language === 'english' ? 'Discount' : 'הנחות' }
                        </button>
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('cart')}>
                    <h3>
                        <button  
                            className={ appState.page === 'cart' ? 'selected' : '' }>
                            <i className="fas fa-shopping-cart"></i>
                            ({itemsInCart})
                            { appState.language === 'english' ? ' Cart' : ' עגלה' }
                        </button> 
                    </h3>
                </div>
                <div
                    className='navbar_item'
                    onClick={() => selectPage('contact')}>
                    <h3>
                        <button
                            className={ appState.page === 'contact' ? 'selected' : '' }>
                            { appState.language === 'english' ? 'Contact' : 'צור קשר' }
                        </button>
                    </h3>
                </div>
            </div>
            <div className='desktop_social_container'>
                <div
                    className='navbar_item'>
                    <h3>
                        <a  rel='noreferrer'
                            href="https://twitter.com/Sugar_Skateshop" target="_blank">
                            <i className="fab fa-twitter"></i>
                            { appState.language === 'english' ? 'Twitter' : 'טוויטר' }
                        </a>
                    </h3>
                </div>
                <div
                    className='navbar_item'>
                    <h3>
                        <a  rel='noreferrer'
                            href="https://www.instagram.com/ms_sugar_skateshop/" target="_blank">
                            <i className="fab fa-instagram"></i>
                            { appState.language === 'english' ? 'Instagram' : 'אינסטגרם' }
                        </a>
                    </h3>
                </div>
                <div
                    className='navbar_item'>
                    <h3>
                        <a  rel='noreferrer'
                            href="https://www.facebook.com/mssugarskateshop" target="_blank">
                            <i className="fab fa-facebook-square"></i>
                           { appState.language === 'english' ? 'Facebook' : 'פייסבוק' }
                        </a>
                    </h3>
                </div>
                <div
                    className='navbar_item'>
                    <h3>
                        <a  rel='noreferrer'
                            href="https://www.youtube.com/channel/UC8hV-7QTBwNbOuV2i4dxIHg" target="_blank">
                            <i className="fab fa-youtube"></i>
                            { appState.language === 'english' ? 'YouTube' : 'יוטיוב' }
                        </a>
                    </h3>
                </div>
            </div>

            <div className='copyright_container'>
                { appState.language === 'english' ? <p>Copyright <i className="far fa-copyright"></i> Ms. Sugar All rights reserved</p> : null }
                { appState.language === 'english' ? null : <p><i className="far fa-copyright"></i> כל הזכויות שמורות ל - 'מיס שוגר'</p> }
            </div>
        </div>
    )
}

export default Footer